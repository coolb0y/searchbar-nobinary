import React from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  SingleRange,
  ResultCard,
  ResultList,
  SingleList
} from "@appbaseio/reactivesearch";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Searchbar() {


 
  return (

    
    <ReactiveBase
      url="http://admin:admin@127.0.0.1:9200"
      app="test5"
      credentials="admin:admin"
      enableAppbase={false}
      
     
      // headers={{
			// 	Authorization:  btoa('readall:Total123@') // Replace with your username and password
			// }}
    >
      {/* other components will go here. */}
      
      <div style={{ display: "flex", flexDirection: "row",alignContent:"center" }}>
      
        
        <div style={{ display: "flex", flexDirection: "column", width: "26%" , }}>
          <DataSearch
            style={{
              marginTop: "35px"
            }}
           
          debounce={500}
          showVoiceSearch={true}
          URLParams={true}
            fuzziness="AUTO"
            queryFormat="or"
            //autosuggest={false}
            componentId="searchbox"
            dataField={[
              "title",
              //"title.autosuggest",
              "filedetails",
              // "fileDetails.autosuggest"
              "artists",
              "album",
              "imgtags"
            ]}
            fieldWeights={[7, 4, 3,2,1 ]}
            placeholder="Search for Learning.."
          />
         
        </div>
      </div>
    </ReactiveBase>
  );
}

export default Searchbar;
