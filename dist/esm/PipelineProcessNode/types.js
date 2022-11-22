export var IPipelineProcessNodeStatus;

(function (IPipelineProcessNodeStatus) {
  IPipelineProcessNodeStatus['PENDING'] = 'pending';
  IPipelineProcessNodeStatus['RUNNING'] = 'running';
  IPipelineProcessNodeStatus['SUCCESS'] = 'success';
  IPipelineProcessNodeStatus['FAILURE'] = 'failure';
  IPipelineProcessNodeStatus['WARN'] = 'warn';
})(IPipelineProcessNodeStatus || (IPipelineProcessNodeStatus = {}));

export var IPipelineProcessNodeStatusColor;

(function (IPipelineProcessNodeStatusColor) {
  IPipelineProcessNodeStatusColor['pending'] = '#999';
  IPipelineProcessNodeStatusColor['running'] = '#479DFF';
  IPipelineProcessNodeStatusColor['success'] = '#52C41A';
  IPipelineProcessNodeStatusColor['failure'] = '#F5222D';
  IPipelineProcessNodeStatusColor['warn'] = 'rgb(255, 164, 61)';
})(IPipelineProcessNodeStatusColor || (IPipelineProcessNodeStatusColor = {}));
