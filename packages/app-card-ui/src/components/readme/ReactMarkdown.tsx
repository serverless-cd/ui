import React, { memo } from 'react';
import Markdown from 'react-markdown';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'; // 设置高亮样式
import { jsx, javascript, java, php } from 'react-syntax-highlighter/dist/esm/languages/prism'; // 设置高亮的语言
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './ReactMarkdown.less'

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('java', java);
SyntaxHighlighter.registerLanguage('php', php);

type Props = {
  text: string;
  className?: string;
  type?: string;
};
const ReactMarkdown = (props: Props) => {
  const { text = '', className = '', type = '' } = props;

  var emojified = React.useMemo(()=>{
    if (type == 'usedetail') {
      if (text.indexOf(`'acs:ram::123456:role/aliyuncdnserverlessdevsrole'`)!==-1) {
        return text?.replace(`'acs:ram::123456:role/aliyuncdnserverlessdevsrole'`, 'acs:ram::123456:role/aliyuncdnserverlessdevsrole')
      }
      
      return text
    }

    else{
      return text?.replace(
        /:(\w+):/g,
        '![:$1:](https://github.githubassets.com/images/icons/emoji/$1.png#emoji)')
    }
  }, [text, type])

  return (
    <Markdown
      className={`full-width fc-markdown ${className}`}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      children={emojified}
      linkTarget="_blank"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        h1(props) {
          return <h1 id={`${props.children}`}> {props.children}</h1>;
        },
        h2(props) {
          return <h2 id={`${props.children}`}> {props.children}</h2>;
        },
        h3(props) {
          return <h3 id={`${props.children}`}> {props.children}</h3>;
        },
        h4(props) {
          return <h4 id={`${props.children}`}> {props.children}</h4>;
        },
        table({ children }) {
          return <table className='fc-markdown1'>{children}</table>;
        },
        ul({ depth, children }) {
          return <ul className={`ul-${depth} ml-32`}>{children}</ul>;
        },
        // ol({ depth, children }) {
        //   return <ol className={`ol-${depth} ml-32`}>{children}</ol>;
        // },
        a({ href, target, children }) {
          if (/^\#\S/.test(href)) {
            return <a href={href}>{children}</a>;
          }
          return (
            <a href={href} target={target}>
              {children}
            </a>
          );
        },
      }}
    />
  );
};

export default memo(ReactMarkdown);
