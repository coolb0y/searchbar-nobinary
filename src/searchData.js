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

import { useState } from "react";

function SearchData() {

  const [fuzzinessval,setFuzzinessval]=useState(2);
  const [queryFormatval,setQueryFormatval]=useState("or");
  const [exactMatch, setExactMatch] = useState(false);
  const [phraseMatch, setPhraseMatch] = useState(false);

  function generateLinkString(url) {
    const parts = url.split('/');
    const domain = parts[2];
    const pathParts = parts.slice(3).map((part) => part.split('.')[0]);
    const formattedURL = `${domain} > ${pathParts.join(' > ')}`;
    return formattedURL;
  }

  const handleExactMatchChange = (event) => {
    setExactMatch(event.target.checked);
    console.log(exactMatch)
    if(exactMatch){
      console.log(exactMatch,'exactMatch fn')
      setFuzzinessval(2);
      setQueryFormatval("or");
    }
    else{
      console.log(exactMatch,'exactMatch fn1')
        setFuzzinessval(0);
        setQueryFormatval("and");
    }
  };


  const handlePhraseMatchChange = (event) => {
    setPhraseMatch(event.target.checked);
    console.log(phraseMatch,'phraseMatch fn')
  
  };


  const customQueryfn = (value, props) => {
    console.log(value,'value')
    console.log(phraseMatch,'phrase matchoutside')
    if (value.trim() !== "") {
      if (phraseMatch) {
        console.log(phraseMatch,'phrase matchoutside inside')
        // Use the phrase match
        //setFuzzinessval(0);
        //setQueryFormatval("and");
        console.log("phrase match",phraseMatch)
        return {
          "query": {
            "bool": {
              "should": [
                {
                  "multi_match": {
                    "query": value,
                    "type": "phrase",
                    "fields": [
                      "title^7",
                      "filedetails^4",
                      "artists^3",
                      "album^2",
                      "imgtags^1"
                    ]
                  }
                }
              ]
            }
          },
          "size": 10,
          "_source": {
            "includes": ["*"],
            "excludes": []
          }
        }
        
      }

      else {
        // Use the default query
        console.log("default query match",phraseMatch)
        return {
          "query": {
            "bool": {
              "must": [
                {
                  "bool": {
                    "should": [
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1"],
                          "type": "cross_fields",
                          "operator": queryFormatval,
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1"],
                          "type": "phrase",
                          "operator": queryFormatval
                        }
                      },
                      {
                        "multi_match": {
                          "query": value,
                          "fields": ["title^7", "filedetails^4", "artists^3", "album^2", "imgtags^1"],
                          "type": "phrase_prefix",
                          "operator": queryFormatval
                        }
                      }
                    ],
                    "minimum_should_match": "1"
                  }
                }
              ]
            }
          },
          "size": 6,
          "_source": {
            "includes": ["*"],
            "excludes": []
          }
        }
        
      }
    }
    return null;
  };

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
      
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "block",
            flexDirection: "column",
            width: "30%",
            margin: "10px",
            maxHeight: '600px',
            maxWidth: '350px',
            overflowY: 'scroll',
            marginTop: '100px',
            
            
          }}
        >   


        <div>

        <label htmlFor="exactMatch" style={{ fontWeight: "bold" ,display:"block" }}>Matching all Terms</label>
            <input
            type="checkbox"
            checked={exactMatch}
            style={{
              width: "19px",
              height: "19px",
              marginLeft: "1px",
              marginRight: "25px",
              display:"inline"
            
          }}
            onChange={handleExactMatchChange}
          />

           <label htmlFor="exactMatch" style={{ display:"inline" , marginBottom:"2px" }}>Check for All term Match</label>
          


           <label htmlFor="PhraseMatch" style={{ fontWeight: "bold" ,display:"block" }}>Phrase Match</label>
            <input
            type="checkbox"
            checked={phraseMatch}
            style={{
              width: "19px",
              height: "19px",
              marginLeft: "1px",
              marginRight: "25px",
              display:"inline"
            
          }}
            onChange={handlePhraseMatchChange}
          />
           <label htmlFor="exactMatch" style={{ display:"inline" , marginBottom:"2px" }}>Check for Phrase Matching</label>
          
         
          <MultiList
            showSearch={true}
            componentId="filetypefilter"
            dataField="filetype"
            title="Filter by file type"
            fielddata={true}
            size={5}
            
          />

          <MultiList
            showSearch={true}
            componentId="baseurlfilter"
            dataField="baseurl"
            title="Filter by Baseurl"
            fielddata={true}
            size={5}
            
          />
          
          
          <SingleRange
            componentId="sizefilter"
            dataField="filesize"
            title="Filter by File Size"
            data={[
              { start: 1000000, end: 2000000, label: "1Mb to 2Mb" },
              { start: 2000001, end: 5000000, label: "2Mb to 5Mb" },
              { start: 5000001, end: 10000000, label: "5Mb to 10Mb" },
              { start: 10000001, end: 5000000000, label: "Bigger than 10Mb" },
              
            ]}
            defaultValue=""
          />
 

            {/* <SingleList
            componentId="baseurlfilter"
            dataField="baseurl"
            title="Base URL"
            size={6}
            //selectAllLabel="All Cities"
           // showRadio={true}
            showCount={true}
           // showSearch={true}
            placeholder="Search URL"
            // react={{
            //   and: ["CategoryFilter", "SearchFilter"]
            // }}
            showFilter={true}
            filterLabel="Base URL"
            URLParams={false}
            loader="Loading ..."
          /> */}
         </div>
         
         </div>
        
        <div style={{ display: "flex", flexDirection: "column", width: "66%" }}>
          <DataSearch
            style={{
              marginTop: "35px"
            }}
          URLParams={true}
          debounce={500}
          showVoiceSearch={true}
           customQuery={customQueryfn}
            fuzziness={fuzzinessval}
            queryFormat={queryFormatval}
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
          <ReactiveList
            componentId="results"
            dataField="title"
            size={6}
            pagination={true}
            react={{
              and: ["searchbox", "sizefilter","baseurlfilter","filetypefilter"]
            }}
            style={{ textAlign: "left" }}
            render={({ data }) =>
            { //console.log(data)
           return (
              
              <ReactiveList.ResultListWrapper>
                {data.map((item) => {

                  let urlnew=generateLinkString(item.url)
                  console.log(urlnew,'urlnew');

                  //console.log(item)
                if(item.filetype==="image"){
                
                  <ReactiveList.ResultCardsWrapper>
                    
                      <ResultCard key={item._id}>
                    <ResultCard.Image
                      style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${item.url})`
                      }}
                    />
                    <ResultCard.Title
                      dangerouslySetInnerHTML={{
                        __html: item.tags
                      }}
                    />
                    
                  </ResultCard>

                  </ReactiveList.ResultCardsWrapper>
                }
                else{
                return  (
                    <ResultList key={item._id}>
                      
                      {/* <ResultList.Image
                        style={{
                          backgroundSize: "cover",
                          backgroundImage: `url(${item.image})`
                        }}
                      /> */}
                       <ResultList.Content>
                        <a href={item.url} style={{ textDecoration: "none", color: "blue" }}>
                      
                      <ResultList.Title
                      style={{ textDecoration: "none", color: "blue" }}
                        dangerouslySetInnerHTML={{
                          __html: item.title?item.title:"No Title Found"
                        }}
                      />
                      <p style={{textDecoration:"none", color:"#989898",fontWeight: "bold"}}>{urlnew}</p>
                      </a>
                      <ResultList.Description>
                        {item.filedetails.substring(0, 250)}
                      </ResultList.Description>
                      </ResultList.Content>
                    </ResultList>
                  )
                }
               })}
              </ReactiveList.ResultListWrapper>
            )}}
          />
        </div>
      </div>
    </ReactiveBase>
  );
}

export default SearchData;
