import { formatDate } from "@/lib/dateFormatter";
import { pcoFetch } from "@/lib/pcoFetch";
import _ from "lodash";
import { redirect } from "next/navigation";
import { start } from "repl";
import { START_DEFAULT, END_DEFAULT } from "../../_components/dateDefaults";
import { personRootSchema, scheduleRootSchema } from "./schema";
import { getDB } from "@/drizzle/client";
import { people } from "@/drizzle/schema";
import { and, eq, inArray, or } from "drizzle-orm";

export async function getData(start: Date, end: Date, teamId: number) {
  const req = await pcoFetch(
    `https://api.planningcenteronline.com/services/v2/teams/${teamId}/people?per_page=100`,
    {
      options: {
        revalidate: 3600,
      },
    }
  );

  const json = await req.json();

  const personData = personRootSchema.parse(json);

  const responses = personData.data.map(async (person) => {
    const url = `/schedules?filter=before,after&after=${formatDate(
      start
    )}&before=${formatDate(end)}&where[team_id]=${teamId}`;
    const req = await pcoFetch(person.links.self + url, {
      callbackUrl: `/dashboard/${teamId}`,
      tooManyHandler: () => {
        if (start != START_DEFAULT || end != END_DEFAULT)
          redirect(`/dashboard/${teamId}`);
      },
      options: {
        revalidate: 3600,
      },
    });

    const data = scheduleRootSchema.parse(await req.json());

    return {
      ...person,
      schedules: { ...data },
    };
  });

  var mappedData = (await Promise.all(responses))
    .filter((x) => x.schedules.data.length > 0)
    

  const ids = mappedData.map((x) => x.id);

  const db = getDB();

  const hiddenPeople = await db
    .select()
    .from(people)
    .where(and(inArray(people.pcoId, ids), eq(people.teamId, teamId)));

  return mappedData.map(x => ({
    ...x,
    hidden: hiddenPeople.filter(y => y.hidden && y.pcoId == x.id).length > 0
  })).map((person) => {
    const validSchedules = person.schedules.data.filter(
      (x) => x.attributes.decline_reason == null
    );

    const positionsServed = _.groupBy(
      person.schedules.data.filter(
        (x) => x.attributes.decline_reason == null
      ),
      (x) => x.attributes.team_position_name
    );

    const numberByPosition = Object.entries(positionsServed).map(
      ([key, value]) => ({
        positionName: key,
        timesServed: value.length,
      })
    );

    return {
      ...person,
      schedules: {
        ...person.schedules,
        data: validSchedules,
        positionsServed: positionsServed,
        numberByPosition: numberByPosition,
      },
    };
  });
}
