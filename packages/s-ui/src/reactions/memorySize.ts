import { Field } from "@formily/core";
import _ from "lodash";

async function memorySize(field: Field) {
  const newMaps = {
    e1: [
      {
        label: "128 MB",
        value: 128,
      },
      {
        label: "256 MB",
        value: 256,
      },
      {
        label: "512 MB",
        value: 512,
      },
      {
        label: "1 GB",
        value: 1024,
      },
      {
        label: "2 GB",
        value: 2048,
      },
      {
        label: "3 GB",
        value: 3072,
      },
    ],
    c1: [
      {
        label: "4 GB",
        value: 4096,
      },
      {
        label: "8 GB",
        value: 8192,
      },
      {
        label: "16 GB",
        value: 16384,
      },
      {
        label: "32 GB",
        value: 32768,
      },
    ],
    g1: [
      {
        label: "16 GB",
        value: 16384,
      },
    ],
  };

  const instanceType = field.query(".instanceType").get("value");
  const dataSource = _.get(newMaps, instanceType, []);

  const defaultValue = field.query(".memorySize").get("value");
  const useDefault = _.find(dataSource, (item) => item.value === defaultValue);

  field.dataSource = dataSource;
  field.value = useDefault ? defaultValue : _.get(dataSource, "[0].value");
  field.disabled = instanceType === "g1";
}

export default memorySize;
