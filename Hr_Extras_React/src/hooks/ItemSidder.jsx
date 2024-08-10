import React from 'react'
import { Li } from '../components/Li';

export const ItemSidder = (creador) => {


    const ItemSider = () => {
        return (
          <>
          {Object.keys(creador).map((category) => (
            <React.Fragment key={category}>
              <li className="pc-item pc-caption">
                <label>{category}</label>
              </li>
              {creador[category].map((item, index) => (
                <Li key={index} icon={item.icon} name={item.name} path={item.path} />
              ))}
            </React.Fragment>
          ))}
        </>
        );
      };



  return {ItemSider};
}
