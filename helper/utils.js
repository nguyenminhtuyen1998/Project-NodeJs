const modelList = require("./../schemas/list");

let filterStatus = async (currentStatus, keyWord) => {
  let statusFilter = [
    {
      label: "All",
      value: "all",
      count: 0,
      link: "#",
      class: "btn-secondary",
      keyWord: keyWord ? `?search=${keyWord}` : "",
    },
    {
      label: "Active",
      value: "active",
      count: 0,
      link: "#",
      class: "btn-secondary",
      keyWord: keyWord ? `?search=${keyWord}` : "",
    },
    {
      label: "Inactive",
      value: "inactive",
      count: 0,
      link: "#",
      class: "btn-secondary",
      keyWord: keyWord ? `?search=${keyWord}` : "",
    },
  ];

  const promises = statusFilter.map(async (item, index) => {
    let payload = {};
    let className =
      currentStatus === "" || item.value === currentStatus
        ? "btn-success"
        : "btn-secondary";
    payload = item.value === "all" ? {} : { status: item.value };
    const count = await modelList.countDocuments(payload);
    statusFilter[index].count = count;
    if (currentStatus) {
      statusFilter[index].class = className;
    } else {
      statusFilter[0].class = "btn-success";
    }
  });

  await Promise.all(promises);

  return statusFilter;
};

module.exports = {
  filterStatus,
};
