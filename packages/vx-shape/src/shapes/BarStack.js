import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Group } from '@vx/group';
import Bar from './Bar';
import { stack as d3stack } from 'd3-shape';

export default function BarStack({
  data,
  className,
  top,
  left,
  x,
  xScale,
  yScale,
  zScale,
  keys,
  height,
  ...restProps
}) {
  const series = d3stack().keys(keys)(data);
  const format = xScale.tickFormat ? xScale.tickFormat() : d => d;
  return (
    <Group
      className={cx('vx-bar-stack', className)}
      top={top}
      left={left}
    >
      {series && series.map((s, i) => {
        return (
          <Group key={`vx-bar-stack-${i}`}>
            {s.map((d, ii) => {
              return (
                <Bar
                  key={`bar-group-bar-${i}-${ii}-${s.key}`}
                  x={xScale(x(d.data))}
                  y={yScale(d[1])}
                  width={xScale.bandwidth()}
                  height={yScale(d[0]) - yScale(d[1])}
                  fill={zScale(s.key)}
                  data={{
                    key: s.key,
                    value: d[1],
                    x: format(x(d.data)),
                    data: d.data
                  }}
                  {...restProps}
                />
              );
            })}
          </Group>
        );
      })}
    </Group>
  );
}

BarStack.propTypes = {
  data: PropTypes.array.isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  zScale: PropTypes.func.isRequired,
  keys: PropTypes.array.isRequired,
  className: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
};
