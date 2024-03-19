import React, { FC, useState, useEffect, useRef } from 'react';
import { Tab } from '@alicloud/console-components';
import { isEmpty, throttle } from 'lodash';
import { i18n } from '../../utils';

export enum NavKey {
  codepre = 'codepre',
  appdetail = 'appdetail',
  usedetail = 'usedetail',
  matters = 'matters',
  local_experience = 'local_experience',
  disclaimers = 'disclaimers',
}

const FIX_HEIGHT = 120;

const navs = [
  {
    key: NavKey.codepre,
    title: i18n('ui.codepre.title'),
  },
  {
    key: NavKey.appdetail,
    title: i18n('ui.application.introduction.document'),
  },
  {
    key: NavKey.usedetail,
    title: i18n('ui.application.usage.document'),
  },
  {
    key: NavKey.matters,
    title: i18n('ui.application.matters.document'),
  },
  // {
  //   key: NavKey.local_experience,
  //   title: i18n('ui.local_experience'),
  // },
  {
    key: NavKey.disclaimers,
    title: i18n('ui.project.disclaimer'),
  },
];

type Props = {
  activeTab?: string;
};

const Nav: FC<Props> = (props) => {
  const { activeTab } = props;
  const scrollRef = useRef({ listen: true });
  const [activeKey, setActiveKey] = useState<string>(NavKey.codepre);

  useEffect(() => {
    const scrollElement = document.getElementsByClassName('panel-body')[0];
    scrollElement.addEventListener('scroll', scrollHandler);
    return () => scrollElement.removeEventListener('scroll', scrollHandler);
  }, []);

  useEffect(() => {
    if (isEmpty(activeTab)) return;
    setTimeout(() => {
      // 延迟获取dom
      showView(activeTab);
    }, 300);
  }, []);

  const scrollHandler = throttle(() => {
    if (!scrollRef.current.listen) return;
    const scrollElement: any = document.getElementsByClassName('panel-body')[0];
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    const appdetail = document.getElementById(NavKey.appdetail);
    const usedetail = document.getElementById(NavKey.usedetail);
    const matters = document.getElementById(NavKey.matters);
    const local_experience = document.getElementById(NavKey.local_experience);
    const disclaimers = document.getElementById(NavKey.disclaimers);

    if (scrollBottom <= 0) {
      setActiveKey(NavKey.disclaimers);
    } else if (scrollTop < appdetail.offsetTop - FIX_HEIGHT) {
      setActiveKey(NavKey.codepre);
    } else if (scrollTop < usedetail.offsetTop - FIX_HEIGHT) {
      setActiveKey(NavKey.appdetail);
    } else if (scrollTop < local_experience.offsetTop - FIX_HEIGHT) {
      setActiveKey(NavKey.usedetail);
    } else if (scrollTop < disclaimers.offsetTop - FIX_HEIGHT) {
      setActiveKey(NavKey.local_experience);
    } else if (scrollTop < matters.offsetTop - FIX_HEIGHT) {
      setActiveKey(NavKey.matters);
    }
  }, 300);

  const showView = (id) => {
    scrollRef.current.listen = false;
    setActiveKey(id);
    const scrollElement = document.getElementsByClassName('panel-body')[0];
    const anchorElement = document.getElementById(id);
    scrollElement.scrollTo({
      top: anchorElement?.offsetTop - 90,
    });
    setTimeout(() => {
      scrollRef.current.listen = true;
    }, 300);
  };
  return (
    <Tab
      shape="pure"
      size="small"
      activeKey={activeKey}
      style={{
        boxShadow: '2px 2px 5px #eee',
        position: 'absolute',
        width: '100%',
        background: '#fff',
        zIndex: 100,
        margin: '-24px -24px 0',
        padding: '0 20px',
      }}
    >
      {navs.map((item) => {
        return (
          <Tab.Item title={item.title} key={item.key} onClick={() => showView(item.key)}></Tab.Item>
        );
      })}
    </Tab>
  );
};

export default Nav;
