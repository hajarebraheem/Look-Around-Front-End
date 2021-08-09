/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';



export default function CitySelect(props) {
  const defaultProps = {
    options: topCity,
    getOptionLabel: (option) => option.city + "  " + option.iata,
  };

  const flatProps = {
    options: topCity.map((option) => option.city),
  };

  const [value, setValue] = React.useState(topCity[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (


    <div >
      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id={props.name}
        clearOnEscape
        renderInput={(params) => <TextField {...params} id={props.name} variant="filled" name={props.name} onSelect={(event) => props.userChangeHandler(event)} onChange={(event) => props.userChangeHandler(event)} label={props.label} margin="normal" />}
      />
    </div>
  );
}
const topCity = [

  { name: "King Khalid International Airport", city: "Riyadh", iata: "RUH" },
  { name: "King Abdulaziz International Airport", city: "Jeddah", iata: "JED" },
  { name: "Prince Mohammad Bin Abdulaziz Airport", city: "Medina", iata: "MED", },
  { name: "Abha Regional Airport", city: "Abha ", iata: "AHB", },
  { name: "King Fahd International Airport", city: "Dhahran", iata: "DMM", },
  { name: "Prince Nayef bin Abdulaziz International Airport", city: "Buraidah", iata: "ELQ", },
  { name: "Jizan Regional Airport", city: "Jazan", iata: "GIZ", },
  { name: "Ta’if Regional Airport", city: "Ta'if", iata: "TIF", },
  { name: "Dubai International Airport", city: "Dubai", iata: "DXB", },
  { name: "Indira Gandhi International Airport", city: "Delhi", iata: "DEL" },
  { name: "Tokyo - All Airports", city: "Tokyo", iata: "TYO", },
  { name: "Cairo International Airport", city: "Cairo", iata: "CAI", },
  { name: "New York City - All Airports", city: "New York City", iata: "NYC", },
  { name: "Paris - All Airports", city: "Paris", iata: "PAR", },
  { name: "London - All Airports", city: "London", iata: "LON", },
  { name: "Benazir Bhutto International Airport ", city: "Rawalpindi", iata: "ISB", },
  {},
  
];