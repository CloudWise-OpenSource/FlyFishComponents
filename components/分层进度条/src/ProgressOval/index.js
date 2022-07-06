import './assets/style.less';
export default function Index(props) {
    let { list = [] } = props.data;
    const { max, showStatus, scheduleOne, scheduleTow } = props

    const calcNum = (num) => {
        return (num / max) * 100
    }
    return (
        <div className='ff-components-progressoval-62c5385c761a42178d753b12'>
            {
                list && list.map((item, index) =>
                    <div className={`upsList ${(index % 2 == 0) && showStatus ? 'check_color' : ''}`} key={index}>
                        <div className='ups_progress'>
                            <div className='seconedProgress'>
                                <div className='sp_name' title={item.name}>{item.name}</div>
                                <div className="progressList">
                                    <div className="bar_schedulebg">
                                        <div style={{backgroundImage: `linear-gradient(270deg, ${scheduleOne} 60%, ${scheduleTow} 100%)`, width: `${calcNum(item.nums)}%`}} className='bar_scheduleRed'></div>
                                        <div className='circle' style={{ left: `${calcNum(item.nums)}%` }}></div>
                                    </div>
                                </div>
                                <div>{item.nums}</div>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    )
}