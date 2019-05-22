import React from "react";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import axios from "axios";


class InputDropDown extends React.Component {

    _onSelect(x) {

    }




    render() {
        // const url = new URL("http://localhost:8080/getStations?type=coastLine");
        //
        // const options = axios.post(url)
        //     .then(response => {
        //
        //         return response.data.toString();
        //
        //
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        //
        // console.log(options);
        //
        //
        const options = [
            'Please select a station',
            'Fort',
            'Secretartat Halt',
            'Kompnnavidiya',
            'Kollupitiya',
            'Bambalapitiya',
            'wellawatte',
            'Dehiwala',
            'Mount Laviniya',
            'Rathmalana',
            'Angulana',
            'Lunawa',
            'Moratuwa',
            'Koralawella',
            'Egodauyana',
            'Panadura',
            'Pinwatte',
            'Wadduwa',
            'Train Halt 01',
            'Kalutara North',
            'Kaluthara South',
            'Katukurunda',
            'Payagala North',
            'Payagala south',
            'Maggona',
            'Beruwala',
            'Hettimulla',
            'Aluthgama',
            'Bentota',
            'Induruwa',
            'Mha Induruwa',
            'kosgoda',
            'Piyagama',
            'Ahungalle',
            'Patagamgoda',
            'Balapitiya',
            'Andadola',
            'Kandegoda',
            'Ambalangoda',
            'Madampagama',
            'Akurala',
            'Kahawa',
            'Telwatte',
            'Seenigama',
            'Hikkaduwa',
            'Thiranagama',
            'Kumarakanda',
            'Dodanduwa',
            'Rathgama',
            'Boossa',
            'Ginthota',
            'Piyadigama',
            'Richmond Hill',
            'Galle',
        ]
        const defaultOption = 'Select';
        return (
            <Dropdown style={{width: '100%'}} name="drop" options={options} onChange={this._onSelect('x')}
                      value={defaultOption} placeholder="Select an option"/>
        );
    }
}

export default InputDropDown;
