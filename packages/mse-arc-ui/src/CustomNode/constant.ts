import Higress from "../../icon/Higress.svg";
import Dubbo from "../../icon/Dubbo.svg";
import Moblie from "../../icon/Moblie.svg";
import Database from "../../icon/Database.svg";
import Kubernetes from "../../icon/Kubernetes.svg";
import KubeVela from "../../icon/KubeVela.svg";
import Nacos from "../../icon/Nacos.svg";
import OpenSergo from "../../icon/OpenSergo.svg";
import RocketMQ from "../../icon/RocketMQ.svg";
import Sentinel from "../../icon/Sentinel.svg";
import Skywalking from "../../icon/Skywalking.svg";
import Seata from "../../icon/Seata.svg";
import SpringJava from "../../icon/SpringJava.svg";
import ChaosBlade from "../../icon/ChaosBlade.svg";
import AppActive from "../../icon/AppActive.svg";

export const IconMap = {
  middle1: [
    {
      url: Moblie,
      name: "",
      visible: false,
    },
  ],
  middle2: [
    {
      url: Higress,
      name: "Higress",
      describe:
        "⼀个遵循开源Ingress/Gateway API标准，提供流量调度、服务治理、安全防护三合⼀的高集成、易使用、易扩展、热更新的下⼀代云原生网关。",
      tags: ["流量网关", "微服务网关", "安全网关"],
      websiteUrl: "https://higress.io/",
      githubUrl: "https://github.com/alibaba/higress",
      latestVersionUrl:
        "https://github.com/alibaba/higress/releases/tag/v0.5.0",
      overviewUrl:
        "https://higress.io/zh-cn/docs/overview/what-is-higress.html",
      apiUrl: "//api.github.com/repos/alibaba/higress",
    },
  ],
  middle3: [
    {
      url: Dubbo,
      name: "Dubbo",
      describe:
        "Apache Dubbo是⼀款微服务框架，为⼤规模微服务 实践提供⾼性能RPC通信、流量治理、可观测性等解决⽅案，涵盖Java、Golang等多种语⾔SDK实现。",
      tags: ["微服务", "服务调⽤", "RPC通信"],
      websiteUrl: "https://dubbo.apache.org/",
      githubUrl: "https://github.com/apache/dubbo",
      latestVersionUrl:
        "https://github.com/apache/dubbo/releases/tag/dubbo-3.1.3",
      overviewUrl: "https://dubbo.apache.org/zh/overview/",
      apiUrl: "//api.github.com/repos/alibaba/dubbo",
    },
    { url: SpringJava, name: "Spring Cloud Alibaba" },
  ],
  middle4: [
    {
      url: Dubbo,
      name: "Dubbo",
      describe:
        "Apache Dubbo是⼀款微服务框架，为⼤规模微服务 实践提供⾼性能RPC通信、流量治理、可观测性等解决⽅案，涵盖Java、Golang等多种语⾔SDK实现。",
      tags: ["微服务", "服务调⽤", "RPC通信"],
      websiteUrl: "https://dubbo.apache.org/",
      githubUrl: "https://github.com/apache/dubbo",
      latestVersionUrl:
        "https://github.com/apache/dubbo/releases/tag/dubbo-3.1.3",
      overviewUrl: "https://dubbo.apache.org/zh/overview/",
      apiUrl: "//api.github.com/repos/alibaba/dubbo",
    },
    { url: SpringJava, name: "Spring Cloud Alibaba" },
  ],
  middle5: [{ url: Database, name: "", visible: false }],
  right1: [
    {
      url: RocketMQ,
      name: "RocketMQ",
      describe:
        "云原生“消息、事件、流”实时数据处理平台，覆盖云边端⼀体化数据处理场景。",
      tags: ["消息", "事件", "流"],
      websiteUrl: "https://rocketmq.apache.org/",
      githubUrl: "https://github.com/apache/rocketmq",
      latestVersionUrl:
        "https://github.com/apache/rocketmq/releases/tag/rocketmq-all-5.0.0",
      overviewUrl:
        "https://rocketmq.apache.org/zh/docs/quickStart/02quickstart",
      apiUrl: "//api.github.com/repos/alibaba/rocketmq",
    },
  ],
  right2: [
    {
      url: Nacos,
      name: "Nacos",
      describe:
        "⼀个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。",
      tags: ["配置管理", "服务发现", "服务管理"],
      websiteUrl: "https://nacos.io/",
      githubUrl: "https://github.com/alibaba/nacos",
      latestVersionUrl: "https://github.com/alibaba/nacos/releases/tag/2.1.2",
      overviewUrl: "https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html",
      apiUrl: "//api.github.com/repos/alibaba/nacos",
    },
  ],
  right3: [
    {
      url: Skywalking,
      name: "Skywalking",
      describe:
        "⼀款用于分布式系统的应用程序性能监视工具，尤其是面向微服务、云原生和基于容器(Kubernetes)架构设计。",
      tags: ["链路追踪", "应用诊断", "性能监控"],
      websiteUrl: "https://skywalking.apache.org/",
      githubUrl: "https://github.com/apache/skywalking",
      latestVersionUrl:
        "https://github.com/apache/skywalking/releases/tag/v9.3.0",
      overviewUrl:
        "https://skywalking.apache.org/docs/skywalking-showcase/latest/readme/",
      apiUrl: "//api.github.com/repos/alibaba/skywalking",
    },
  ],
  left1: [
    {
      url: Sentinel,
      name: "Sentinel",
      describe:
        "Sentinel是⼀款面向分布式、多语言异构化服务架构的流量治理组件。",
      tags: ["高可用", "流量治理", "流量防护"],
      websiteUrl: "https://sentinelguard.io/",
      githubUrl: "https://github.com/alibaba/Sentinel",
      latestVersionUrl:
        "https://github.com/alibaba/Sentinel/releases/tag/1.8.6",
      overviewUrl: "https://sentinelguard.io/zh-cn/docs/quick-start.html",
      apiUrl: "//api.github.com/repos/alibaba/sentinel",
    },
    {
      url: OpenSergo,
      name: "OpenSergo",
      describe:
        "OpenSergo是⼀套开放通用的、面向云原生服务、覆盖微服务及上下游关联组件的微服务治理标准。",
      tags: ["微服务治理 ", "治理标准", "流量治理"],
      websiteUrl: "https://opensergo.io/",
      githubUrl: "https://github.com/opensergo/opensergo-specification",
      latestVersionUrl:
        "https://github.com/opensergo/opensergo-java-sdk/releases/tag/v0.1.0-beta1",
      overviewUrl:
        "https://opensergo.io/zh-cn/docs/quick-start/opensergo-control-plane/",
      apiUrl: "//api.github.com/repos/alibaba/opensergo",
    },
    {
      url: ChaosBlade,
      name: "ChaosBlade",
      describe:
        "ChaosBlade是⼀个云原生混沌工程平台，支持多种环境、集群和语言。",
      tags: ["高可用", "云原生", "混沌工程"],
      websiteUrl: "https://chaosblade.io/",
      githubUrl: "https://github.com/chaosblade-io/chaosblade",
      latestVersionUrl:
        "https://github.com/chaosblade-io/chaosblade/releases/tag/v1.7.0",
      overviewUrl: "https://chaosblade.io/docs",
      apiUrl: "//api.github.com/repos/alibaba/chaosblade",
    },
    {
      url: AppActive,
      name: "AppActive",
      //   describe:
      //     "⼀个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。",
      //   tags: ["配置管理", "服务发现", "服务管理"],
      //   websiteUrl: "https://nacos.io/",
      //   githubUrl: "https://github.com/alibaba/nacos",
      //   latestVersionUrl: "https://github.com/alibaba/nacos/releases/tag/2.1.2",
      //   overviewUrl: "https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html",
    },
  ],
  left2: [
    {
      url: KubeVela,
      name: "KubeVela",
      describe:
        "是⼀个现代化的软件交付平台，它可以让你的应用交付在当今流行的混合、多云环境中变得更加简单、高效、可靠。",
      tags: ["软件交付", "应用管理", "多云部署"],
      websiteUrl: "https://kubevela.io/",
      githubUrl: "https://github.com/kubevela/kubevela",
      latestVersionUrl:
        "https://github.com/kubevela/kubevela/releases/tag/v1.6.4",
      overviewUrl: "https://kubevela.io/zh/docs/quick-start",
      apiUrl: "//api.github.com/repos/alibaba/kubevela",
      
    },
    {
      url: Kubernetes,
      name: "Kubernetes",
      describe:
        "Kubernetes是⼀个开源的容器编排引擎，用来对容器化应用进行自动化部署、扩缩和管理。",
      tags: ["容器编排", "应用管理", "发布部署"],
      websiteUrl: "https://kubernetes.io/",
      githubUrl: "https://github.com/kubernetes/kubernetes",
      latestVersionUrl:
        "https://github.com/kubernetes/kubernetes/releases/tag/v1.23.14",
      overviewUrl: "https://kubernetes.io/zh-cn/docs/setup/",
      apiUrl: "//api.github.com/repos/alibaba/kubernetes",
    },
  ],
  left3: [
    {
      url: Seata,
      name: "Seata",
      describe:
        "Seata是⼀款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。",
      tags: ["分布式事务", "数据一致性", "微服务"],
      websiteUrl: "https://seata.io/",
      githubUrl: "https://github.com/seata/seata",
      latestVersionUrl: "https://github.com/seata/seata/releases/tag/v1.5.2",
      overviewUrl: "https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html",
      apiUrl: "//api.github.com/repos/alibaba/seata",
    },
  ],
};
