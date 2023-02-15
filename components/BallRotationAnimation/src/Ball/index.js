/*
 * @Author: your name
 * @Date: 2022-04-21 13:35:00
 * @LastEditTime: 2022-04-24 11:27:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /yuexiu-cat-food/src/routes/yuexiu-full-service/components/flyfishBall/index.js
 */

import React from 'react'
import './index.less'
export default function Index({ data, time, rotateZ, fontColor, fontSize, marginBottom }) {
  const newTime = time / data.length;

  return (
    <div className="box" style={{ transform: `rotateZ(-${rotateZ}deg)` }}>
      {
        data.map((item, index) => {
          return <div key={index} className={`ball ball${index}`} style={{ transform: `rotateZ(${rotateZ}deg)` }}>
            <div className='name' style={{ color: fontColor, fontSize, marginBottom}}>{item.title}</div>

            <style jsx="true">
              {`
              .ball${index}{
                animation: animX ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${-(time / 4) - index * newTime}s infinite ,
                animY ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite,
                scale ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite ;
                -ms-transform: animX ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${-(time / 4) - index * newTime}s infinite ,
                animY ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite,
                scale ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite ; /* IE 9 */
                -moz-transform: animX ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${-(time / 4) - index * newTime}s infinite ,
                animY ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite,
                scale ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite ; /* Firefox */
                -o-transform: animX ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${-(time / 4) - index * newTime}s infinite ,
                animY ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite,
                scale ${time}s cubic-bezier(0.36, 0, 0.64, 1) ${0 - index * newTime}s infinite ; /* Opera */
              }
            `}
            </style>
          </div>
        })
      }
      <style jsx="true">
        {`
          @keyframes scale {
            0% {
              transform: scale(0.7) rotateZ(${rotateZ}deg);
            }
            50% {
              transform: scale(1) rotateZ(${rotateZ}deg);
            }
            100% {
              transform: scale(0.7) rotateZ(${rotateZ}deg);
            }
          }
        `}
      </style>
    </div>
  )
}
