import React from "react";

const ListIem = (({item, role}) => {
  return (<div className='item-wrap'>
      {item.orderStatus === '2' ? <span className="status">{item.commented ? '已评价' : '评价'}</span> : ''}
      <h3>
        <span className="code">产品编码</span>{item.productCode}
        <span
          className={item.orderStatus === '2' ? 'finish tags' : 'tags'}>{item.orderStatus === '2' ? '已完成' : '建设中'}</span>
      </h3>
      <p style={{"paddingBottom": "8px"}}>{item.productType}</p>
      {item.productType === '电路租用' ?
        (<div>
          <p className="flex-wrap address"><span className="label">A端地址</span>{item.aPortAddress}</p>
          <p className="flex-wrap address"><span className="label">Z端地址</span>{item.aPortAddress}</p>
        </div>) : <p className="address">{item.specialLineAddress}</p>}
      <div className="customrinfo">
        <p><span>{role.role === 2 ? '客户' : '客户经理'}</span>{item.customerManagerName}</p>
        <p><span>联系电话</span>{item.customerManagerPhone}</p>
      </div>
    </div>
  )
})

export default ListIem


