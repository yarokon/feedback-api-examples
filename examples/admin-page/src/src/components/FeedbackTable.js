import { Table, Tag } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const getColumns = (data) => {
  return [
    {
      width: 200,
      title: 'Response',
      dataIndex: 'response',
      key: 'response',
      sorter: (a, b) => {
        if (isNaN(Number(a.response))) {
          return a.response.localeCompare(b.response);
        } else {
          return a.response - b.response;
        }
      }
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Page',
      dataIndex: 'page',
      key: 'page',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      filters: [...new Set(data.map(item => item.tags).flat())].map(tag => ({ text: tag, value: tag })),
      onFilter: (value, record) => record.tags.includes(value),
      render: tags => tags.map(tag => (<Tag color="blue" key={tag}>{tag}</Tag>))
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [...new Set(data.map(item => item.category))]
        .filter(category => category)
        .map(category => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Api Operation',
      dataIndex: 'apiOperationId',
      key: 'apiOperationId',
      filters: [...new Set(data.map(item => item.apiOperationId))]
        .filter(apiOperationId => apiOperationId)
        .map(apiOperationId => ({ text: apiOperationId, value: apiOperationId })),
      onFilter: (value, record) => record.apiOperationId === value,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new moment(a.createdAt) - new moment(b.createdAt)
    },
  ];
}

function FeedbackTable (props) {
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  return (
    <Table
      columns={getColumns(props.data)}
      rowKey={(record) => record.id}
      pagination={tableParams.pagination}
      dataSource={props.data}
      onChange={(pagination) => setTableParams({ pagination })}
      size="middle"
    />
  )
}

export default FeedbackTable;