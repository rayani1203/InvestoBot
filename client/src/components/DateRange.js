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
        <div style={{backgroundColor:"#EEEEEE",borderRadius:"15px"}} class="mx-auto p-4 my-3 w-75">
          <h3 style={{textAlign: "center"}}>Filter Results</h3>
        <div style={{display:"flex",  justifyContent: "center", alignItems: "center"}} className='my-3 mx-auto w-100'>
          <div style={{display:"inline-block"}}>
          
        <DatePicker id="date-picker" className="mx-3"
        showIcon
        selected={year}
        onChange={(date) => {props.state(date); setYear(date);}}
        />
        <div>
        <label class="me-3" for="date-picker">Earliest date to view results from</label>
        </div>
        </div>
        <div style={{marginLeft: "100px"}}>
        
        <Dropdown id="dropdown" options={options} onChange={purchase} value={defaultOption}/>
        <label for="dropdown" class="me-4">Filter by purchase or sale date</label>
        </div>
        </div>
        </div>
    );
}

export default DateRange;