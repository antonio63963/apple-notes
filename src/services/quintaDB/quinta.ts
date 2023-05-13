import axios from "axios";

const CREATE_NOTE = `https://quintadb.com/apps/aOpJlcGSneWO_dHh9dnYzb/dtypes.json`;
const DELETE_NOTE = 'https://quintadb.com/apps/aOpJlcGSneWO_dHh9dnYzb/dtypes'

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

interface INote {
  id: string;
  title: string;
  date: Date;
  description: string;
  isSelected?: boolean;
}

interface ISuccess {
  status: string;
  data: any;
}

const getBodyRequest = (title: string, description: string) => ({
  rest_api_key: process.env.REACT_APP_API_KEY,
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
  };
}

const quintaDB = {
  getAll: async function (): Promise<ISuccess> {
    const response = await axios.get<{ records: IRecord[] }>(ALL_NOTES);
    console.log(response.data.records);
    const formatedNotes = response.data.records.map((note) => {
      return responseHandler(note);
    });
    return { status: response.statusText, data: formatedNotes };
  },

  add: async function (note: INote): Promise<ISuccess> {
    const { title, description } = note;
    const body = getBodyRequest(title, description);
    const response = await axios.post(CREATE_NOTE, body);
    return { status: response.statusText, data: response.data.record };
  },

  put: async function (note: INote, id: string): Promise<ISuccess> {
    const body = getBodyRequest(note.title, note.description);
    const response = await axios.post(`${CREATE_NOTE}/${id}`, body);
    return {
      status: response.statusText,
      data: responseHandler(response.data.record),
    };
  },

  delete: async function (id: string): Promise<ISuccess> {
    const response = await axios.delete(
      `${DELETE_NOTE}/${id}.json?rest_api_key=${process.env.REACT_APP_API_KEY}`
    );
    console.log('quinta dlete: ', response)
    return {
      status: response.statusText,
      data: response.data,
    };
  },
};

export default quintaDB;
