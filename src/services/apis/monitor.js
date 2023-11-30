export const apiMonitor = (response) => {
  response.ok
    ? console.group(
        "%c API_RESPONSE! %c" + response.config.url,
        "background: #222; color: #bada55; font-size:16px",
        "background:red;color:white;"
      )
    : console.group(
        "%c API_RESPONSE! %c" + response.config.url,
        "background: #222; color: #ff7788; font-size:16px",
        "background:red;color:white;"
      );
  console.groupEnd();
};
