const SvgSource = {
  SpringJava:
    'https://img.alicdn.com/imgextra/i2/O1CN014OFGKB1PjFoyRkUVK_!!6000000001876-55-tps-28-28.svg',
  Skywalking:
    'https://img.alicdn.com/imgextra/i2/O1CN01YaRcu81aNgwrDXFdb_!!6000000003318-55-tps-36-36.svg',
  Sentinel:
    'https://img.alicdn.com/imgextra/i3/O1CN01Z19f2d1X38JuBVfLX_!!6000000002867-55-tps-22-33.svg',
  Seata:
    'https://img.alicdn.com/imgextra/i2/O1CN01gTVczm23JDwHnxg2U_!!6000000007234-55-tps-20-30.svg',
  RocketMQ:
    'https://img.alicdn.com/imgextra/i1/O1CN01GdnNjG29rveE86qsW_!!6000000008122-55-tps-25-27.svg',
  OpenSergo:
    'https://img.alicdn.com/imgextra/i1/O1CN01XZzR6J1DgiEaLFB8c_!!6000000000246-55-tps-22-24.svg',
  Nacos:
    'https://img.alicdn.com/imgextra/i3/O1CN01Mi9RDw1wFphKfvLxV_!!6000000006279-55-tps-29-14.svg',
  Moblie:
    'https://img.alicdn.com/imgextra/i3/O1CN01xqLyrD1EzmKwFr5za_!!6000000000423-55-tps-54-53.svg',
  KubeVela:
    'https://img.alicdn.com/imgextra/i4/O1CN01TQsfeG1Joqy8zt3am_!!6000000001076-55-tps-28-32.svg',
  Kubernetes:
    'https://img.alicdn.com/imgextra/i4/O1CN01K8luu41pyX2kiPDpx_!!6000000005429-55-tps-28-27.svg',
  Higress:
    'https://img.alicdn.com/imgextra/i1/O1CN01KfsTd81N4NEm4dUeW_!!6000000001516-55-tps-28-25.svg',
  Dubbo:
    'https://img.alicdn.com/imgextra/i1/O1CN01Bgku601IaMpCoTO7l_!!6000000000909-55-tps-23-27.svg',
  Database:
    'https://img.alicdn.com/imgextra/i2/O1CN01a6QhuT1K9SmsiRJsj_!!6000000001121-55-tps-72-72.svg',
  ChaosBlade:
    'https://img.alicdn.com/imgextra/i3/O1CN01W9zJae25Wcl6rIDF5_!!6000000007534-55-tps-31-18.svg',
  AppActive:
    'https://img.alicdn.com/imgextra/i3/O1CN01CPTOAs21f5cQLspak_!!6000000007011-55-tps-24-34.svg',
};

const CompleteSvgSource = {
  SpringJava:
    'https://img.alicdn.com/imgextra/i3/O1CN01mtnd5Y1pOo9J8nnMX_!!6000000005351-55-tps-200-36.svg',
  Skywalking:
    'https://img.alicdn.com/imgextra/i2/O1CN01TwMGAB1JBSuJs89IV_!!6000000000990-55-tps-200-36.svg',
  Sentinel:
    'https://img.alicdn.com/imgextra/i4/O1CN01MOPC3d26x1CW2bKow_!!6000000007727-55-tps-200-36.svg',
  Seata:
    'https://img.alicdn.com/imgextra/i3/O1CN01RYYGIS1M97jPdoxvS_!!6000000001391-55-tps-200-36.svg',
  RocketMQ:
    'https://img.alicdn.com/imgextra/i1/O1CN01M4UwIV1eCTiSBhioa_!!6000000003835-55-tps-200-36.svg',
  OpenSergo:
    'https://img.alicdn.com/imgextra/i2/O1CN01syKCmL26AvcDuGjki_!!6000000007622-55-tps-200-36.svg',
  Nacos:
    'https://img.alicdn.com/imgextra/i4/O1CN011jCRlz22FGuMYgt1w_!!6000000007090-55-tps-200-36.svg',
  KubeVela:
    'https://img.alicdn.com/imgextra/i4/O1CN01tpHsxw1KDaMHBTj0J_!!6000000001130-55-tps-200-36.svg',
  Kubernetes:
    'https://img.alicdn.com/imgextra/i1/O1CN018g3SFB1cVb10sxwJc_!!6000000003606-55-tps-201-37.svg',
  Higress:
    'https://img.alicdn.com/imgextra/i2/O1CN01oZ8maS1diFZgFZOiX_!!6000000003769-55-tps-200-36.svg',
  Dubbo:
    'https://img.alicdn.com/imgextra/i3/O1CN01JUoVCT1I0BXNas0nd_!!6000000000830-55-tps-200-36.svg',
  ChaosBlade:
    'https://img.alicdn.com/imgextra/i4/O1CN01QmiFs01FsjrmkMBeL_!!6000000000543-55-tps-200-36.svg',
  AppActive:
    'https://img.alicdn.com/imgextra/i1/O1CN019dTRNx1b6ZlBZBptH_!!6000000003416-55-tps-200-43.svg',
};

export const IconMap = {
  middle1: [
    {
      url: SvgSource.Moblie,
      name: '',
      visible: false,
    },
  ],
  middle2: [
    {
      url: SvgSource.Higress,
      completeUrl: CompleteSvgSource.Higress,
      name: 'Higress',
      describe:
        '⼀个遵循开源Ingress/Gateway API标准，提供流量调度、服务治理、安全防护三合⼀的高集成、易使用、易扩展、热更新的下⼀代云原生网关。',
      tags: ['流量网关', '微服务网关', '安全网关'],
      websiteUrl: 'https://higress.io/',
      githubUrl: 'https://github.com/alibaba/higress',
      latestVersionUrl: 'https://github.com/alibaba/higress/releases/tag/v0.5.0',
      overviewUrl: 'https://higress.io/zh-cn/docs/overview/what-is-higress.html',
      apiUrl: '//api.github.com/repos/alibaba/higress',
    },
  ],
  middle3: [
    {
      url: SvgSource.Dubbo,
      completeUrl: CompleteSvgSource.Dubbo,
      name: 'Dubbo',
      describe:
        'Apache Dubbo是⼀款微服务框架，为⼤规模微服务 实践提供⾼性能RPC通信、流量治理、可观测性等解决⽅案，涵盖Java、Golang等多种语⾔SDK实现。',
      tags: ['微服务', '服务调⽤', 'RPC通信'],
      websiteUrl: 'https://dubbo.apache.org/',
      githubUrl: 'https://github.com/apache/dubbo',
      latestVersionUrl: 'https://github.com/apache/dubbo/releases/tag/dubbo-3.1.3',
      overviewUrl: 'https://dubbo.apache.org/zh/overview/',
      apiUrl: '//api.github.com/repos/alibaba/dubbo',
    },
    {
      url: SvgSource.SpringJava,
      completeUrl: CompleteSvgSource.SpringJava,
      name: 'Spring Cloud Alibaba',
      describe: '一站式的分布式应用开发框架。',
      tags: ['应用框架', '微服务'],
      githubUrl: ' https://github.com/alibaba/spring-cloud-alibaba',
      apiUrl: '//api.github.com/repos/alibaba/spring-cloud-alibaba',
      websiteUrl: 'https://spring.io/projects/spring-cloud-alibaba',
      overviewUrl: 'https://github.com/alibaba/spring-cloud-alibaba/blob/2021.x/README-zh.md',
      latestVersionUrl: 'https://github.com/alibaba/spring-cloud-alibaba/releases/tag/2021.0.4.0',
    },
  ],
  middle4: [
    {
      url: SvgSource.Dubbo,
      completeUrl: CompleteSvgSource.Dubbo,
      name: 'Dubbo',
      describe:
        'Apache Dubbo是⼀款微服务框架，为⼤规模微服务 实践提供⾼性能RPC通信、流量治理、可观测性等解决⽅案，涵盖Java、Golang等多种语⾔SDK实现。',
      tags: ['微服务', '服务调⽤', 'RPC通信'],
      websiteUrl: 'https://dubbo.apache.org/',
      githubUrl: 'https://github.com/apache/dubbo',
      latestVersionUrl: 'https://github.com/apache/dubbo/releases/tag/dubbo-3.1.3',
      overviewUrl: 'https://dubbo.apache.org/zh/overview/',
      apiUrl: '//api.github.com/repos/alibaba/dubbo',
    },
    {
      url: SvgSource.SpringJava,
      completeUrl: CompleteSvgSource.SpringJava,
      name: 'Spring Cloud Alibaba',
      describe: '一站式的分布式应用开发框架。',
      tags: ['应用框架', '微服务'],
      githubUrl: ' https://github.com/alibaba/spring-cloud-alibaba',
      apiUrl: '//api.github.com/repos/alibaba/spring-cloud-alibaba',
      websiteUrl: 'https://spring.io/projects/spring-cloud-alibaba',
      overviewUrl: 'https://github.com/alibaba/spring-cloud-alibaba/blob/2021.x/README-zh.md',
      latestVersionUrl: 'https://github.com/alibaba/spring-cloud-alibaba/releases/tag/2021.0.4.0',
    },
  ],
  middle5: [{ url: SvgSource.Database, name: '', visible: false }],
  right1: [
    {
      url: SvgSource.RocketMQ,
      completeUrl: CompleteSvgSource.RocketMQ,
      name: 'RocketMQ',
      describe: '云原生“消息、事件、流”实时数据处理平台，覆盖云边端⼀体化数据处理场景。',
      tags: ['消息', '事件', '流'],
      websiteUrl: 'https://rocketmq.apache.org/',
      githubUrl: 'https://github.com/apache/rocketmq',
      latestVersionUrl: 'https://github.com/apache/rocketmq/releases/tag/rocketmq-all-5.0.0',
      overviewUrl: 'https://rocketmq.apache.org/zh/docs/quickStart/02quickstart',
      apiUrl: '//api.github.com/repos/apache/rocketmq',
    },
  ],
  right2: [
    {
      url: SvgSource.Nacos,
      completeUrl: CompleteSvgSource.Nacos,
      name: 'Nacos',
      describe: '⼀个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。',
      tags: ['配置管理', '服务发现', '服务管理'],
      websiteUrl: 'https://nacos.io/',
      githubUrl: 'https://github.com/alibaba/nacos',
      latestVersionUrl: 'https://github.com/alibaba/nacos/releases/tag/2.1.2',
      overviewUrl: 'https://nacos.io/zh-cn/docs/v2/quickstart/quick-start.html',
      apiUrl: '//api.github.com/repos/alibaba/nacos',
    },
  ],
  right3: [
    {
      url: SvgSource.Skywalking,
      completeUrl: CompleteSvgSource.Skywalking,
      name: 'Skywalking',
      describe:
        '⼀款用于分布式系统的应用程序性能监视工具，尤其是面向微服务、云原生和基于容器(Kubernetes)架构设计。',
      tags: ['链路追踪', '应用诊断', '性能监控'],
      websiteUrl: 'https://skywalking.apache.org/',
      githubUrl: 'https://github.com/apache/skywalking',
      latestVersionUrl: 'https://github.com/apache/skywalking/releases/tag/v9.3.0',
      overviewUrl: 'https://skywalking.apache.org/docs/skywalking-showcase/latest/readme/',
      apiUrl: '//api.github.com/repos/apache/skywalking',
    },
  ],
  left1: [
    {
      url: SvgSource.Sentinel,
      completeUrl: CompleteSvgSource.Sentinel,
      name: 'Sentinel',
      describe: 'Sentinel是⼀款面向分布式、多语言异构化服务架构的流量治理组件。',
      tags: ['高可用', '流量治理', '流量防护'],
      websiteUrl: 'https://sentinelguard.io/',
      githubUrl: 'https://github.com/alibaba/Sentinel',
      latestVersionUrl: 'https://github.com/alibaba/Sentinel/releases/tag/1.8.6',
      overviewUrl: 'https://sentinelguard.io/zh-cn/docs/quick-start.html',
      apiUrl: '//api.github.com/repos/alibaba/sentinel',
    },
    {
      url: SvgSource.OpenSergo,
      completeUrl: CompleteSvgSource.OpenSergo,
      name: 'OpenSergo',
      describe:
        'OpenSergo是⼀套开放通用的、面向云原生服务、覆盖微服务及上下游关联组件的微服务治理标准。',
      tags: ['微服务治理 ', '治理标准', '流量治理'],
      websiteUrl: 'https://opensergo.io/',
      githubUrl: 'https://github.com/opensergo/opensergo-specification',
      latestVersionUrl: 'https://github.com/opensergo/opensergo-java-sdk/releases/tag/v0.1.0-beta1',
      overviewUrl: 'https://opensergo.io/zh-cn/docs/quick-start/opensergo-control-plane/',
      apiUrl: '//api.github.com/repos/opensergo/opensergo-specification',
    },
    {
      url: SvgSource.ChaosBlade,
      completeUrl: CompleteSvgSource.ChaosBlade,
      name: 'ChaosBlade',
      describe: 'ChaosBlade是⼀个云原生混沌工程平台，支持多种环境、集群和语言。',
      tags: ['高可用', '云原生', '混沌工程'],
      websiteUrl: 'https://chaosblade.io/',
      githubUrl: 'https://github.com/chaosblade-io/chaosblade',
      latestVersionUrl: 'https://github.com/chaosblade-io/chaosblade/releases/tag/v1.7.0',
      overviewUrl: 'https://chaosblade.io/docs',
      apiUrl: '//api.github.com/repos/chaosblade-io/chaosblade',
    },
    {
      url: SvgSource.AppActive,
      completeUrl: CompleteSvgSource.AppActive,
      name: 'AppActive',
      describe: '一款标准、通用且功能强大的，致力于构建应用多活架构的开源中间件。',
      tags: ['多活容灾', '高可用', '稳定性'],
      websiteUrl: 'https://doc.appactive.io/',
      githubUrl: 'https://github.com/alibaba/Appactive',
      latestVersionUrl: 'https://github.com/alibaba/Appactive/releases/tag/v0.2.1',
      overviewUrl: 'https://doc.appactive.io/docs/cn/README_CN.html/',
      apiUrl: '//api.github.com/repos/alibaba/Appactive',
    },
  ],
  left2: [
    {
      url: SvgSource.KubeVela,
      completeUrl: CompleteSvgSource.KubeVela,
      name: 'KubeVela',
      describe:
        '是⼀个现代化的软件交付平台，它可以让你的应用交付在当今流行的混合、多云环境中变得更加简单、高效、可靠。',
      tags: ['软件交付', '应用管理', '多云部署'],
      websiteUrl: 'https://kubevela.io/',
      githubUrl: 'https://github.com/kubevela/kubevela',
      latestVersionUrl: 'https://github.com/kubevela/kubevela/releases/tag/v1.6.4',
      overviewUrl: 'https://kubevela.io/zh/docs/quick-start',
      apiUrl: '//api.github.com/repos/kubevela/kubevela',
    },
    {
      url: SvgSource.Kubernetes,
      completeUrl: CompleteSvgSource.Kubernetes,
      name: 'Kubernetes',
      describe: 'Kubernetes是⼀个开源的容器编排引擎，用来对容器化应用进行自动化部署、扩缩和管理。',
      tags: ['容器编排', '应用管理', '发布部署'],
      websiteUrl: 'https://kubernetes.io/',
      githubUrl: 'https://github.com/kubernetes/kubernetes',
      latestVersionUrl: 'https://github.com/kubernetes/kubernetes/releases/tag/v1.23.14',
      overviewUrl: 'https://kubernetes.io/zh-cn/docs/setup/',
      apiUrl: '//api.github.com/repos/alibaba/kubernetes',
    },
  ],
  left3: [
    {
      url: SvgSource.Seata,
      completeUrl: CompleteSvgSource.Seata,
      name: 'Seata',
      describe:
        'Seata是⼀款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。',
      tags: ['分布式事务', '数据一致性', '微服务'],
      websiteUrl: 'https://seata.io/',
      githubUrl: 'https://github.com/seata/seata',
      latestVersionUrl: 'https://github.com/seata/seata/releases/tag/v1.5.2',
      overviewUrl: 'https://seata.io/zh-cn/docs/ops/deploy-guide-beginner.html',
      apiUrl: '//api.github.com/repos/seata/seata',
    },
  ],
};
