jQuery(document).ready(function () {
  const queryParam = new URLSearchParams(window.location.search);
  const page = parseInt(queryParam.get("page"));
  if (!page || page === 1) {
    document.getElementById("prev-page-item").style =
      "color: white; background-color: #007bff";
  } else {
    document.getElementById("curr-page-item").style =
      "color: white; background-color: #007bff";
  }
});
