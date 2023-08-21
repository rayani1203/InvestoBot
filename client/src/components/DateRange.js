import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function DateRange(props) {
    let [year, setYear] = useState(new Date());
    const options = [
        'Purchase', 'Sell'
      ];
      const defaultOption = options[0];

      function purchase(event){
        props.type(event.value);
      }
    
    return (
        <div style={{display:"flex"}} className='my-3'>
        <DatePicker className="mx-3"
        showIcon
        selected={year}
        onChange={(date) => {props.state(date); setYear(date);}}
        />

        <Dropdown options={options} onChange={purchase} value={defaultOption}/>
        </div>
    );
}

export default DateRange;