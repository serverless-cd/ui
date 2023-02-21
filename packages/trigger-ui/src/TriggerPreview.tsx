import React from 'react';
import { Table, Tag } from '@alicloud/console-components';
import { MatchTypeCheckedLabel, MatchRuleDataSource } from './constants';
import { find, isEmpty, forEach, map, get, keys, split, isArray, values } from 'lodash';

const { Group: TagGroup } = Tag;

type IPreview = {
  dataSource: any[];
};

const previewFormaData = (value) => {
  if (isArray(value)) return values;
  let dataSource: any[] = [];
  forEach(['push.branches', 'push.tags', 'pull_request.branches'], (key) => {
    const ruleValues = get(value, key);
    if (!isEmpty(ruleValues)) {
      forEach(keys(ruleValues), (rule) => {
        const values = ruleValues[rule];
        const newData = map(values, (branchValue) => {
          const eventOrMatchKeys = split(key, '.');
          const isPR = key === 'pull_request.branches';
          return {
            eventType: eventOrMatchKeys[0],
            matchType: eventOrMatchKeys[1],
            matchRule: rule,
            targetBranch: isPR ? branchValue['target'] : branchValue,
            sourceBranch: isPR ? branchValue['source'] : '',
            triggerType: isPR ? get(value, `pull_request.types`, []) : [],
          };
        });
        dataSource = dataSource.concat(newData);
      });
    }
  });
  return dataSource;
};

const Column = () => {
  const getMatchRule = (rule) => {
    const ruleValues = find(MatchRuleDataSource, { value: rule });
    return !isEmpty(ruleValues) ? ruleValues['label'] : '';
  };

  return [
    {
      title: '事件类型',
      dataIndex: 'eventType',
    },
    {
      title: '匹配类型',
      dataIndex: 'matchType',
      cell: (value) => <span>{MatchTypeCheckedLabel[value]}</span>,
    },
    {
      title: '匹配规则',
      dataIndex: 'matchRule',
      cell: (value) => <span>{getMatchRule(value)}</span>,
    },
    {
      title: '目标分支',
      dataIndex: 'targetBranch',
    },
    {
      title: '来源分支',
      dataIndex: 'sourceBranch',
    },
    {
      title: '触发类型',
      dataIndex: 'triggerType',
      cell: (value) => {
        return (
          <TagGroup>
            {map(value, (item) => (
              <Tag key={item} type="primary" size="small">
                {item}
              </Tag>
            ))}
          </TagGroup>
        );
      },
    },
  ];
};

const TriggerPreview = (props: IPreview) => {
  const { dataSource = [] } = props;
  return <Table columns={Column()} dataSource={previewFormaData(dataSource) as any} />;
};

export default TriggerPreview;
