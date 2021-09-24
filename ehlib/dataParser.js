/**
 * 保留小数位数,四舍五入方式
 * @param {Number, String} data 要转换的数据
 * @param {Number} num  保留几位小数
 * @return {String} 返回的是数字的字符串形式
 */
function toFixed(data, num) {
  let tempData = new Number(data);
  return tempData.toFixed(num);
}

/**
 * 解析飞机传感器
 * @param {Array} imus          存储飞机传感器数据的数组
 * @param {String} sensorName   单个分类的字段名称
 */
function resolveDroneSensor(imus, sensorName) {
  let result = [];
  imus.forEach((item) => {
    result.push(JSON.parse(JSON.stringify(item[sensorName])));
  });
  return result;
}

// 解析飞机的电机
function resolveDroneMotors(motors) {
  let result = [];
  let compare = function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    };
  };
  let sortResult = motors.sort(compare("index"));
  sortResult.map((item) => {
    result.push(item.speedPercent);
  });
  return result;
}

const dataStruct = [
  {
    desc: "飞机id",
    name: "copterUuid",
    accessPath: "copterUuid",
    default: "",
  },
  {
    desc: "飞机类型",
    name: "type",
    accessPath: "firmware.copterType",
    default: 0,
  },
  {
    desc: "控制权限",
    name: "operationLevel",
    accessPath: "controlInformation.operationLevel",
    default: 0,
  },
  {
    desc: "控制权限用户id",
    name: "userId",
    accessPath: "controlInformation.userId",
    default: 0,
  },
  {
    desc: "控制权限用户名称",
    name: "userName",
    accessPath: "controlInformation.userName",
    default: "",
  },
  {
    desc: "海拔高度",
    name: "elevation",
    accessPath: "position.elevation",
    default: 0,
    formatter: function (val) {
      return toFixed(val, 2);
    },
  },
  {
    desc: "飞行高度",
    name: "altitude",
    accessPath: "position.altitude",
    default: 0,
    formatter: function (val) {
      return toFixed(val, 1);
    },
  },
  {
    desc: "水平飞行的距离",
    name: "flightDistance2D",
    accessPath: "position.flightDistance2D",
    default: 0,
    formatter: function (val) {
      return toFixed(val / 1000, 1);
    },
  },
  {
    desc: "高德纬度",
    name: "latitude",
    accessPath: "position.latitude",
    default: 0,
  },
  {
    desc: "高德纬度",
    name: "longitude",
    accessPath: "position.longitude",
    default: 0,
  },
  {
    desc: "gps纬度",
    name: "gpsLatitude",
    accessPath: "position.latitude",
    default: 0,
  },
  {
    desc: "gps经度",
    name: "gpsLongitude",
    accessPath: "position.longitude",
    default: 0,
  },
  {
    desc: "横滚",
    name: "roll",
    accessPath: "attitude.roll",
    default: 0,
    formatter: function (val) {
      return Number(parseFloat(val).toFixed(3));
    },
  },
  {
    desc: "倾斜度",
    name: "pitch",
    accessPath: "attitude.pitch",
    default: 0,
    formatter: function (val) {
      return Number(parseFloat(val).toFixed(3));
    },
  },
  {
    desc: "偏航",
    name: "yaw",
    accessPath: "attitude.yaw",
    default: 0,
    formatter: function (val) {
      return Number(parseFloat(val).toFixed(3));
    },
  },
  {
    desc: "角度",
    name: "heading",
    accessPath: "attitude.heading",
    default: 0,
  },
  {
    desc: "飞机报错信息",
    name: "statusText",
    accessPath: "status.statusText",
    default: "",
  },
  {
    desc: "错误信息严重程度,见枚举MAV_SEVERITY",
    name: "statusTextSeverity",
    accessPath: "status.statusTextSeverity",
    default: "",
  },
  {
    desc: "当前电量,百分比",
    name: "batteryRemaining",
    accessPath: "battery.batteryRemaining",
    default: 0,
  },
  {
    desc: "电流",
    name: "batteryCurrent",
    accessPath: "battery.batteryCurrent",
    default: 0,
  },
  {
    desc: "电压",
    name: "batteryVoltage",
    accessPath: "battery.batteryVoltage",
    default: 0,
  },
  {
    desc: "电量可以支持的飞行时间",
    name: "canFlyTime",
    accessPath: "battery.canFlyTime",
    default: 0,
  },
  {
    desc: "电池的电量值",
    name: "electricQuantity",
    accessPath: "battery.electricQuantity",
    default: 0,
  },
  {
    desc: "电池温度",
    name: "batteryTemperature",
    accessPath: "battery.batteryTemperature",
    default: 0,
  },
  {
    desc: "是否有电池报错",
    name: "hasBmsError",
    accessPath: "bmsError.hasBmsError",
    default: 0,
  },
  {
    desc: "卫星数目",
    name: "satelliteCount",
    accessPath: "component.gpses",
    default: 0,
    formatter: function (val) {
      if (Array.isArray(val) && val.length > 0) {
        return val[0].satelliteCount;
      } else {
        return 0;
      }
    },
  },
  {
    desc: "水平精度因子",
    name: "hdop",
    accessPath: "component.gpses",
    default: 0,
    formatter: function (val) {
      if (Array.isArray(val) && val.length > 0) {
        return val[0].hdop;
      } else {
        return 0;
      }
    },
  },
  {
    desc: "垂直精度因子",
    name: "vdop",
    accessPath: "component.gpses",
    default: 0,
    formatter: function (val) {
      if (Array.isArray(val) && val.length > 0) {
        return val[0].vdop;
      } else {
        return 0;
      }
    },
  },
  {
    desc: "GPS锁定类型",
    name: "fixType",
    accessPath: "component.gpses",
    default: 0,
    formatter: function (val) {
      if (Array.isArray(val) && val.length > 0) {
        return val[0].fixType;
      } else {
        return 0;
      }
    },
  },
  {
    desc: "空速",
    name: "airSpeed",
    accessPath: "status.speed.airSpeed",
    default: 0,
    formatter: function (val) {
      return parseInt(val);
    },
  },
  {
    desc: "地速",
    name: "groundSpeed",
    accessPath: "status.speed.groundSpeed",
    default: 0,
    formatter: function (val) {
      return parseFloat(val * 3.6).toFixed(1);
    },
  },
  {
    desc: "地速ms",
    name: "groundSpeedMS",
    accessPath: "status.speed.groundSpeed",
    default: 0,
    formatter: function (val) {
      return parseFloat(val).toFixed(1);
    },
  },
  {
    desc: "爬升速度",
    name: "climbSpeed",
    accessPath: "status.speed.climbSpeed",
    default: 0,
    formatter: function (val) {
      return parseFloat(val).toFixed(1);
    },
  },
  {
    desc: "是否解锁",
    name: "isUnlocked",
    accessPath: "status.isUnlocked",
    default: false,
  },
  {
    desc: "解锁时间",
    name: "unLockTimeStamp",
    accessPath: "missionInfo.unLockTimeStamp",
    default: null,
  },
  {
    desc: "锁定时间",
    name: "lockTimeStamp",
    accessPath: "missionInfo.lockTimeStamp",
    default: null,
  },
  {
    desc: "是否可以起飞",
    name: "canTakeOff",
    accessPath: "status.canTakeOff",
    default: 0,
  },
  {
    desc: "记录时间",
    name: "lastLogTimeStamp",
    accessPath: "connectionInfo.lastLogTimeStamp",
    default: 0,
  },
  {
    desc: "当前模式",
    name: "mode",
    accessPath: "status.mode",
    default: 0,
  },
  {
    desc: "当前航班步骤",
    name: "flightStep",
    accessPath: "missionInfo.flightStep",
    default: 0,
  },
  {
    desc: "当前航班编号",
    name: "flightCode",
    accessPath: "missionInfo.flightCode",
    default: null,
  },
  {
    desc: "当前航线code",
    name: "airlineCode",
    accessPath: "missionInfo.airlineCode",
    default: "",
  },
  {
    desc: "进入failSafe的原因",
    name: "failSafeReason",
    accessPath: "status.failSafeReason",
    default: 0,
  },
  {
    desc: "GPS传感器",
    name: "gps",
    accessPath: "component.gpses",
    default: [],
  },
  {
    desc: "气压计",
    name: "barometer",
    accessPath: "component.barometers",
    default: [],
  },
  {
    desc: "磁罗盘",
    name: "magnetometer",
    accessPath: "component.imus",
    default: [],
    formatter: function (val) {
      return resolveDroneSensor(val, "magnetometer");
    },
  },
  {
    desc: "加速计",
    name: "accelerometer",
    accessPath: "component.imus",
    default: [],
    formatter: function (val) {
      return resolveDroneSensor(val, "accelerometer");
    },
  },
  {
    desc: "陀螺仪",
    name: "gyrometer",
    accessPath: "component.imus",
    default: [],
    formatter: function (val) {
      return resolveDroneSensor(val, "gyrometer");
    },
  },
  {
    desc: "雷达",
    name: "radar",
    accessPath: "component.radar",
    // TODO:这里默认是对象,在实际中会不会全部公用了这个引用
    default: {},
    formatter: function (val) {
      return JSON.parse(JSON.stringify(val));
    },
  },
  {
    desc: "桨的顺序",
    name: "motors",
    accessPath: "component.motors",
    default: [],
    formatter: function (val) {
      return resolveDroneMotors(val);
    },
  },
  {
    desc: "桨的顺序",
    name: "motorsList",
    accessPath: "component.motors",
    default: [],
  },
  {
    desc: "pmu",
    name: "pmu",
    accessPath: "component.autonomousAerialVehicle.powerSystem.devicePowers",
    default: [],
  },
  {
    desc: "pcu",
    name: "pcu",
    accessPath:
      "component.autonomousAerialVehicle.powerSystem.powerConvertUnits",
    default: {},
    formatter: function (val) {
      return val[0] || {};
    },
  },
  {
    desc: "bms",
    name: "bms",
    accessPath: "component.autonomousAerialVehicle.powerSystem.motorPower",
    default: {},
  },
  {
    desc: "统计出来的电池信息",
    name: "battery",
    accessPath: "battery.batteryTemperature",
    default: {},
    formatter: function (val) {
      return {
        batteryTemperature: val,
      };
    },
  },
];

/**
 * 递归函数,更具字段层级获取字段值
 * @param {Object} sData 获取数据的对象
 * @param {Object} fData 记录当前字段的详情对象
 * @param {String} accessPath 字段访问路径
 *
 */
function deepGetValue(sData, fData, accessPath) {
  // 如果是undefined就给默认值
  let pathArr = accessPath.split(".");
  let key = pathArr.shift();
  if (pathArr.length === 0) {
    return sData[key] === undefined || sData[key] === null
      ? typeof fData.default === "function"
        ? fData.default()
        : fData.default
      : sData[key];
  }
  return sData[key] === undefined || sData[key] === null
    ? typeof fData.default === "function"
      ? fData.default()
      : fData.default
    : deepGetValue(sData[key], fData, pathArr.join("."));
}

/**
 * 解析数据
 * @param {*} item 源数据对象
 * @returns {Object} 解析后的数据
 */
export function dataTransition(item) {
  let initData = {};
  dataStruct.reduce((initData, currentItem) => {
    if (typeof currentItem.formatter === "function") {
      initData[currentItem.name] = currentItem.formatter(
        deepGetValue(item, currentItem, currentItem.accessPath)
      );
    } else {
      initData[currentItem.name] = deepGetValue(
        item,
        currentItem,
        currentItem.accessPath
      );
    }
    return initData;
  }, initData);
  return initData;
}

export function dataTransitionArr(sData) {
  let result = [];
  if (sData.length === 0) {
    return result;
  }
  sData.forEach((item) => {
    result.push(dataTransition(item));
  });
  return result;
}
