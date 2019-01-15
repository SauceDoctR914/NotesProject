import React, { Component } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../redux/actions/actions";
import Select from "react-select";
class NoteBookContainer extends Component {
  componentDidMount() {
    const { notebook } = this.props.location.state;
  }

  state = {
    value: "",
    selectedOption: null,
    translated: ""
  };

  languages = [
    {
      value: "sq",
      label: "Albanian"
    },
    {
      value: "ar",
      label: "Arabic"
    },
    {
      value: "hy",
      label: "Armenian"
    },
    {
      value: "az",
      label: "Azerbaijani"
    },
    {
      value: "eu",
      label: "Basque"
    },
    {
      value: "be",
      label: "Belarusian"
    },
    {
      value: "bn",
      label: "Bengali; Bangla"
    },
    {
      value: "bs",
      label: "Bosnian"
    },
    {
      value: "br",
      label: "Breton"
    },
    {
      value: "bg",
      label: "Bulgarian"
    },
    {
      value: "my",
      label: "Burmese"
    },
    {
      value: "ca",
      label: "Catalan; Valencian"
    },
    {
      value: "ch",
      label: "Chamorro"
    },
    {
      value: "ce",
      label: "Chechen"
    },
    {
      value: "zh",
      label: "Chinese"
    },
    {
      value: "co",
      label: "Corsican"
    },
    {
      value: "hr",
      label: "Croatian"
    },
    {
      value: "cs",
      label: "Czech"
    },
    {
      value: "da",
      label: "Danish"
    },
    {
      value: "dv",
      label: "Divehi; Dhivehi; Maldivian;"
    },
    {
      value: "nl",
      label: "Dutch"
    },
    {
      value: "en",
      label: "English"
    },
    {
      value: "et",
      label: "Estonian"
    },
    {
      value: "fi",
      label: "Finnish"
    },
    {
      value: "fr",
      label: "French"
    },
    {
      value: "ka",
      label: "Georgian"
    },
    {
      value: "de",
      label: "German"
    },
    {
      value: "el",
      label: "Greek, Modern"
    },
    {
      value: "ht",
      label: "Haitian; Haitian Creole"
    },
    {
      value: "he",
      label: "Hebrew (modern)"
    },
    {
      value: "hi",
      label: "Hindi"
    },
    {
      value: "hu",
      label: "Hungarian"
    },
    {
      value: "id",
      label: "Indonesian"
    },
    {
      value: "ga",
      label: "Irish"
    },
    {
      value: "is",
      label: "Icelandic"
    },
    {
      value: "it",
      label: "Italian"
    },
    {
      value: "ja",
      label: "Japanese"
    },
    {
      value: "jv",
      label: "Javanese"
    },
    {
      value: "kl",
      label: "Kalaallisut, Greenlandic"
    },
    {
      value: "kk",
      label: "Kazakh"
    },
    {
      value: "km",
      label: "Khmer"
    },
    {
      value: "ky",
      label: "Kyrgyz"
    },
    {
      value: "kg",
      label: "Kongo"
    },
    {
      value: "ko",
      label: "Korean"
    },
    {
      value: "ku",
      label: "Kurdish"
    },
    {
      value: "la",
      label: "Latin"
    },
    {
      value: "lb",
      label: "Luxembourgish, Letzeburgesch"
    },
    {
      value: "lo",
      label: "Lao"
    },
    {
      value: "lt",
      label: "Lithuanian"
    },
    {
      value: "lu",
      label: "Luba-Katanga"
    },
    {
      value: "lv",
      label: "Latvian"
    },

    {
      value: "mk",
      label: "Macedonian"
    },

    {
      value: "ms",
      label: "Malay"
    },
    {
      value: "mt",
      label: "Maltese"
    },

    {
      value: "mn",
      label: "Mongolian"
    },

    {
      value: "nv",
      label: "Navajo, Navaho"
    },
    {
      value: "nb",
      label: "Norwegian BokmÃ¥l"
    },

    {
      value: "ne",
      label: "Nepali"
    },

    {
      value: "nn",
      label: "Norwegian Nynorsk"
    },
    {
      value: "no",
      label: "Norwegian"
    },
    {
      value: "cu",
      label:
        "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic"
    },
    {
      value: "or",
      label: "Oriya"
    },
    {
      value: "os",
      label: "Ossetian, Ossetic"
    },
    {
      value: "pa",
      label: "Panjabi, Punjabi"
    },
    {
      value: "fa",
      label: "Persian (Farsi)"
    },
    {
      value: "pl",
      label: "Polish"
    },
    {
      value: "ps",
      label: "Pashto, Pushto"
    },
    {
      value: "pt",
      label: "Portuguese"
    },

    {
      value: "rn",
      label: "Kirundi"
    },
    {
      value: "ro",
      label: "Romanian, [])"
    },
    {
      value: "ru",
      label: "Russian"
    },
    {
      value: "sc",
      label: "Sardinian"
    },
    {
      value: "se",
      label: "Northern Sami"
    },
    {
      value: "sm",
      label: "Samoan"
    },
    {
      value: "sg",
      label: "Sango"
    },
    {
      value: "sr",
      label: "Serbian"
    },
    {
      value: "gd",
      label: "Scottish Gaelic; Gaelic"
    },

    {
      value: "sk",
      label: "Slovak"
    },
    {
      value: "sl",
      label: "Slovene"
    },
    {
      value: "so",
      label: "Somali"
    },
    {
      value: "az",
      label: "South Azerbaijani"
    },
    {
      value: "es",
      label: "Spanish; Castilian"
    },
    {
      value: "su",
      label: "Sundanese"
    },
    {
      value: "sw",
      label: "Swahili"
    },
    {
      value: "ss",
      label: "Swati"
    },
    {
      value: "sv",
      label: "Swedish"
    },
    {
      value: "ta",
      label: "Tamil"
    },
    {
      value: "th",
      label: "Thai"
    },
    {
      value: "bo",
      label: "Tibetan Standard, Tibetan, Central"
    },
    {
      value: "tk",
      label: "Turkmen"
    },
    {
      value: "tl",
      label: "Tagalog"
    },
    {
      value: "tn",
      label: "Tswana"
    },
    {
      value: "to",
      label: "Tonga (Tonga Islands)"
    },
    {
      value: "tr",
      label: "Turkish"
    },
    {
      value: "tt",
      label: "Tatar"
    },
    {
      value: "tw",
      label: "Twi"
    },
    {
      value: "ty",
      label: "Tahitian"
    },
    {
      value: "uk",
      label: "Ukrainian"
    },
    {
      value: "ur",
      label: "Urdu"
    },
    {
      value: "uz",
      label: "Uzbek"
    },
    {
      value: "vi",
      label: "Vietnamese"
    },
    {
      value: "wo",
      label: "Wolof"
    },
    {
      value: "fy",
      label: "Western Frisian"
    },
    {
      value: "xh",
      label: "Xhosa"
    },
    {
      value: "yi",
      label: "Yiddish"
    },
    {
      value: "yo",
      label: "Yoruba"
    },
    {
      value: "za",
      label: "Zhuang, Chuang"
    },
    {
      value: "zu",
      label: "Zulu"
    }
  ];
  fromLang = "en";
  text = this.props.location.state.notebook.attributes.title;

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption.value);
  };

  translateNote = e => {
    e.preventDefault();
    if (this.state.selectedOption != null) {
      let toLang = this.state.selectedOption.value;
      let apiKey: "ba34c5dfb77907ceb9c351920c5e696d5490cc9a";
      let url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyD_yxf_x5eaj2mp4Re1UcjeuRiHhbaHN-A&q=${
        this.text
      }&source=en&target=${toLang}`;
      // url += "&q=" + `encodeURI(${this.text})`;
      // let toLang = "es";
      // url += `&source=${this.fromLang}`;
      // url += `${this.toLang}`;
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })
        .then(res => res.json())
        .then(translation =>
          this.setState({
            translated: translation.data.translations[0].translatedText
          })
        )
        .catch(error => {
          console.log(
            "There was an error with the translation request: ",
            error
          );
        });
    }
  };

  render() {
    if (this.state.selectedOption != null) {
      console.log(this.state.selectedOption.value, "texted");
    }
    return (
      <div>
        <div>
          <div id="translation" />
        </div>
        <form onSubmit={e => this.translateNote(e)}>
          <Select
            className="select-translate"
            value={this.selectedOption}
            onChange={this.handleChange}
            options={this.languages}
            placeholder={"Please select a language"}
          />
          <input type="submit" name="Submit" />
        </form>
        <div className="translated">
          {this.state.translated.length > 0 ? this.state.translated : "Loading"}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state) {
    return {
      user: state.currentUser,
      jwt: state.currentUser.jwt,
      notes: state.notes
    };
  }
};

const mapDispatchToProps = dispatch => {
  return { fetchNotes: () => dispatch(fetchNotes()) };
};

export default withRouter(NoteBookContainer);
