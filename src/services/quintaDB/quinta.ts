import axios from "axios";


const CREATE_NOTE = `https://quintadb.com/apps/aOpJlcGSneWO_dHh9dnYzb/dtypes.json`;

const ALL_NOTES =
"https://quintadb.com/apps/aOpJlcGSneWO_dHh9dnYzb/dtypes/entity/ddJ8k7W6TjC6ldG8krh8o0.json?rest_api_key=baW70-W5PdMyoBomkvumkJ&amp;view=";

interface IRecord {
  id: string;
  created_at: string;
  values: {
    dcHMaVW7TgB4o9WOVdI2jw: string;
    cld8kye8jmWRtdGwXoBCoR: string;
  };
}

const getBodyRequest = (title: string, description: string) => ({
  rest_api_key: process.env.REACT_APP_API_KEY,
  // rest_api_key: "baW70-W5PdMyoBomkvumkJ",
  values: {
    entity_id: "ddJ8k7W6TjC6ldG8krh8o0",
    dcHMaVW7TgB4o9WOVdI2jw: title,
    cld8kye8jmWRtdGwXoBCoR: description,
  },
});

function responseHandler(note: IRecord) {
  return {
    id: note.id,
    title: note.values.dcHMaVW7TgB4o9WOVdI2jw,
    description: note.values.cld8kye8jmWRtdGwXoBCoR,
    date: new Date(note.created_at),
  }
}

const getAll = async () => {
  try {
    const { data } = await axios.get<{ records: IRecord[] }>(ALL_NOTES);
    console.log(data.records);
    const formatedNotes = data.records.map((note) => {
      return responseHandler(note);
    });
    console.log("formatedNotes: ", formatedNotes);
  } catch (err) {
    console.log(err);
  }
};

const createNote = async (title: string, description: string) => {
  const body = getBodyRequest(title, description);
  return await axios.post(CREATE_NOTE, body);
};

const updateNote = async (id: string, title: string, description: string) => {
  const body = getBodyRequest(title, description);
  const {data: {record}} = await axios.post(`${CREATE_NOTE}/${id}`, body);
  return responseHandler(record);
};

const deleteNote = async (id: string) => {
  const {data: {record}} = await axios.post(`${CREATE_NOTE}/${id}`, {rest_api_key: process.env.REACT_APP_API_KEY} );
  return responseHandler(record);
};

export { getAll, createNote, updateNote, deleteNote };
