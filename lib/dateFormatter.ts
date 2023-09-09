export function formatDate(val : Date) {
    const year = val.getUTCFullYear();
    const month = val.getUTCMonth() + 1;
    const day = val.getUTCDate();

    return `${year}/${month}/${day}`;
  }