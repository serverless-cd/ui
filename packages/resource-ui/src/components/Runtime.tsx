import { Badge } from '@alicloud/console-components';
import React, { memo } from 'react';
import F from '../constants';
import { getCustomRuntime } from '../utils/global';
import { i18n } from '../utils';

const Runtime = ({ runtime, customRuntime = false, testing = false }) => {
  return (
    <div className="display-flex mt-2 fc-language-select">
      {F.SVG_ICON[F.ICON[runtime]] && (
        <div className="mt-5 language-small-svg-icon">{F.SVG_ICON[F.ICON[runtime]]}</div>
      )}
      {F.IMG_ICON[F.ICON[runtime]] && (
        <div className="mt-3 language-small-svg-icon">
          <img src={F.IMG_ICON[F.ICON[runtime]]} />
        </div>
      )}
      <div className="ml-10">
        {i18n(`${runtime}.label`)}
        {['nodejs16', 'nodejs14'].includes(runtime) && !customRuntime && (
          <>
            <span className="text-description ml-10">{i18n('powerby.alinode.label')}</span>
          </>
        )}
        {runtime === 'java11' && !customRuntime && (
          <>
            <span className="text-description ml-10">{i18n('powerby.dragonwell.label')}</span>
          </>
        )}
        {(testing || (['nodejs16', 'python3.10'].includes(runtime) && !customRuntime)) && (
          <>
            <span className="text-description ml-10">
              <Badge
                content={i18n('public.testing.stage')}
                style={{ backgroundColor: '#FADA5E', color: '#000000', borderRadius: 15 }}
              />
            </span>
          </>
        )}

        {customRuntime && (
          <span className="text-description ml-10">{i18n('function.runtime.custom.label')}</span>
        )}

        {customRuntime && (
          <span className="text-description ml-10">
            {i18n(`debian.version.${getCustomRuntime(runtime)}.label`)}
          </span>
        )}

        {(testing ||
          (['python3.10.debian10', 'nodejs18.debian10', 'nodejs16.debian10', 'debian10'].includes(
            runtime,
          ) &&
            customRuntime)) && (
          <>
            <span className="text-description ml-10">
              <Badge
                content={i18n('public.testing.stage')}
                style={{
                  backgroundColor: '#FADA5E',
                  color: '#000000',
                  borderRadius: 15,
                  marginTop: -3,
                }}
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Runtime);
