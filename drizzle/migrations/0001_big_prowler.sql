ALTER TABLE people ADD `teamId` integer;--> statement-breakpoint
CREATE INDEX `teamId_idx` ON `people` (`teamId`);--> statement-breakpoint
CREATE INDEX `pcoId_idx` ON `people` (`pcoId`);