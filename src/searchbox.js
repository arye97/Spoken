// import React from 'react';
// import { Dropdown } from 'semantic-ui-react'
// import 'semantic-ui-css/semantic.min.css'
// import axios from 'axios';
// import ReactDOM from "react-dom";
//
// //list of curated language options with ISO Codes
// // which are available in RESTCountries API
//
// const languageOptions = [
//   {key:"af",text:"Afrikaans",value:"Afrikaans"},
//   {key:"sq",text:"Albanian",value:"Albanian"},
//   {key:"am",text:"Amharic",value:"Amharic"},
//   {key:"ar",text:"Arabic",value:"Arabic"},
//   {key:"hy",text:"Armenian",value:"Armenian"},
//   {key:"az",text:"Azerbaijani",value:"Azerbaijani"},
//   {key:"be",text:"Belarusian",value:"Belarusian"},
//   {key:"bn",text:"Bengali",value:"Bengali"},
//   {key:"bi",text:"Bislama",value:"Bislama"},
//   {key:"bs",text:"Bosnian",value:"Bosnian"},
//   {key:"bg",text:"Bulgarian",value:"Bulgarian"},
//   {key:"my",text:"Burmese",value:"Burmese"},
//   {key:"ca",text:"Catalan",value:"Catalan"},
//   {key:"ch",text:"Chamorro",value:"Chamorro"},
//   {key:"ny",text:"Nyanja",value:"Nyanja"},
//   {key:"zh",text:"Chinese",value:"Chinese"},
//   {key:"hr",text:"Croatian",value:"Croatian"},
//   {key:"cs",text:"Czech",value:"Czech"},
//   {key:"da",text:"Danish",value:"Danish"},
//   {key:"dv",text:"Maldivian",value:"Maldivian"},
//   {key:"nl",text:"Dutch",value:"Dutch"},
//   {key:"en",text:"English",value:"English"},
//   {key:"et",text:"Estonian",value:"Estonian"},
//   {key:"fo",text:"Faroese",value:"Faroese"},
//   {key:"fj",text:"Fijian",value:"Fijian"},
//   {key:"fi",text:"Finnish",value:"Finnish"},
//   {key:"fr",text:"French",value:"French"},
//   {key:"ff",text:"Fula",value:"Fula"},
//   {key:"gl",text:"Galician",value:"Galician"},
//   {key:"ka",text:"Georgian",value:"Georgian"},
//   {key:"de",text:"German",value:"German"},
//   {key:"el",text:"Greek",value:"Greek"},
//   {key:"gn",text:"Guaraní",value:"Guaraní"},
//   {key:"ht",text:"Haitian",value:"Haitian"},
//   {key:"ha",text:"Hausa",value:"Hausa"},
//   {key:"he",text:"Hebrew",value:"Hebrew"},
//   {key:"hi",text:"Hindi",value:"Hindi"},
//   {key:"hu",text:"Hungarian",value:"Hungarian"},
//   {key:"id",text:"Indonesian",value:"Indonesian"},
//   {key:"ga",text:"Irish",value:"Irish"},
//   {key:"is",text:"Icelandic",value:"Icelandic"},
//   {key:"it",text:"Italian",value:"Italian"},
//   {key:"ja",text:"Japanese",value:"Japanese"},
//   {key:"kk",text:"Kazakh",value:"Kazakh"},
//   {key:"rw",text:"Kinyarwanda",value:"Kinyarwanda"},
//   {key:"ky",text:"Kyrgyz",value:"Kyrgyz"},
//   {key:"kv",text:"Komi",value:"Komi"},
//   {key:"kg",text:"Kongo",value:"Kongo"},
//   {key:"ko",text:"Korean",value:"Korean"},
//   {key:"ku",text:"Kurdish",value:"Kurdish‎"},
//   {key:"lb",text:"Luxembourgish",value:"Luxembourgish"},
//   {key:"ln",text:"Lingala",value:"Lingala"},
//   {key:"lo",text:"Lao",value:"Lao"},
//   {key:"lt",text:"Lithuanian",value:"Lithuanian"},
//   {key:"lu",text:"Luba-Katanga",value:"Luba-Katanga"},
//   {key:"lv",text:"Latvian",value:"Latvian"},
//   {key:"gv",text:"Manx",value:"Manx"},
//   {key:"mk",text:"Macedonian",value:"Macedonian"},
//   {key:"mg",text:"Malagasy",value:"Malagasy"},
//   {key:"ms",text:"Malay",value:"Malay‎"},
//   {key:"mt",text:"Maltese",value:"Maltese"},
//   {key:"mi",text:"Māori",value:"te reo Māori"},
//   {key:"mh",text:"Marshallese",value:"Marshallese"},
//   {key:"mn",text:"Mongolian",value:"Mongolian"},
//   {key:"na",text:"Nauru",value:"Nauru"},
//   {key:"nv",text:"Navajo",value:"Navajo"},
//   {key:"nb",text:"Norwegian",value:"Norwegian"},
//   {key:"nd",text:"North Ndebele",value:"North Ndebele"},
//   {key:"ne",text:"Nepali",value:"Nepali"},
//   {key:"ng",text:"Ndonga",value:"Ndonga"},
//   {key:"nn",text:"Norwegian Nynorsk",value:"Norwegian Nynorsk"},
//   {key:"no",text:"Norwegian",value:"Norwegian"},
//   {key:"nr",text:"South Ndebele",value:"South Ndebele"},
//   {key:"pa",text:"Panjabi",value:"Panjabi"},
//   {key:"fa",text:"Persian",value:"Persian"},
//   {key:"pl",text:"Polish",value:"Polish"},
//   {key:"ps",text:"Pashto",value:"Pashto"},
//   {key:"pt",text:"Portuguese",value:"Portuguese"},
//   {key:"rn",text:"Kirundi",value:"Kirundi"},
//   {key:"ro",text:"Romanian",value:"Romanian"},
//   {key:"ru",text:"Russian",value:"Russian"},
//   {key:"sd",text:"Sindhi",value:"Sindhi‎"},
//   {key:"sm",text:"Samoan",value:"Samoan"},
//   {key:"sg",text:"Sango",value:"Sango"},
//   {key:"sr",text:"Serbian",value:"Serbian"},
//   {key:"sn",text:"Shona",value:"Shona"},
//   {key:"si",text:"Sinhala",value:"Sinhala"},
//   {key:"sk",text:"Slovak",value:"Slovak"},
//   {key:"sl",text:"Slovene",value:"Slovene"},
//   {key:"so",text:"Somali",value:"Somali"},
//   {key:"st",text:"Southern Sotho",value:"Sesotho"},
//   {key:"es",text:"Spanish",value:"Spanish"},
//   {key:"sw",text:"Swahili",value:"Swahili"},
//   {key:"ss",text:"Swati",value:"Swati"},
//   {key:"sv",text:"Swedish",value:"Swedish"},
//   {key:"ta",text:"Tamil",value:"Tamil"},
//   {key:"tg",text:"Tajik",value:"Tajik"},
//   {key:"th",text:"Thai",value:"Thai"},
//   {key:"ti",text:"Tigrinya",value:"Tigrinya"},
//   {key:"tk",text:"Turkmen",value:"Turkmen"},
//   {key:"tn",text:"Tswana",value:"Tswana"},
//   {key:"to",text:"Tongan",value:"Tonga"},
//   {key:"tr",text:"Turkish",value:"Turkish"},
//   {key:"ts",text:"Tsonga",value:"Tsonga"},
//   {key:"uk",text:"Ukrainian",value:"Ukrainian"},
//   {key:"ur",text:"Urdu",value:"Urdu"},
//   {key:"uz",text:"Uzbek",value:"Uzbek‎"},
//   {key:"ve",text:"Venda",value:"Venda"},
//   {key:"vi",text:"Vietnamese",value:"Vietnamese"},
//   {key:"xh",text:"Xhosa",value:"Xhosa"}
// ]
//
// export default class SearchBox extends React.Component {
//     constructor(props) {
//       super(props);
//       this.lat = null;
//       this.lng = null;
//     }
//
//     moveToCountry(lat, lng) {
//       this.map.flyTo({
//         center: [
//           this.lat,
//           this.lng
//         ],
//         essential: true // this animation is considered essential with respect to prefers-reduced-motion
//       });
//
//     }
//
//     /**
//      * Needs to be a
//      * @param language (the ISO code)
//      * @returns {Promise<any>} the countries data - all countries return data
//      */
//     async getLanguageCountries(language) {
//       let url = 'https://restcountries.eu/rest/v2/lang/' + language;
//       let currentCountryInfo = await axios.get(url);
//       console.log(currentCountryInfo.data);
//       let latlng = currentCountryInfo.data[0].latlng; //language may belong to multiple countries, just test with first one
//       this.moveToCountry(latlng[0], latlng[1]);
//       return currentCountryInfo.data;
//
//     }
//
//     findLanguageISO(language) {
//       let i = 0;
//       for (i = 0; i < languageOptions.length; i++) {
//         if (languageOptions[i].text === language) {
//           return languageOptions[i].key;
//         }
//       }
//     }
//
//     render() {
//       return (
//           <div>
//             <Dropdown
//                 id={'languageOptions'}
//                 button
//                 className='icon'
//                 floating
//                 labeled
//                 icon='world'
//                 options={languageOptions}
//                 search
//                 placeholder="Select Language"
//                 text={Dropdown.text}
//                 onChange={(e, {value}) => {
//                   let isoCode = this.findLanguageISO(e.target.textContent);
//                   this.getLanguageCountries(isoCode);
//                 }}
//             />
//           </div>
//       )
//     }
// }
//
