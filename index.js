let calendar = null;

window.onload = () => {
  const calendar_element = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendar_element, {
    navLinks: true, // 日付をクリックしたときに日付ビューに移動するかどうか
    businessHours: true, // 休日にハイライトを表示するかどうか
    locale: "ja", // 表示言語の設定
    nowIndicator: true, // タイムラインの現在時刻に赤線を表示する
    headerToolbar: {
      // https://fullcalendar.io/docs/headerToolbar
      // 使えるViewの一覧は https://fullcalendar.io/docs のViewsの項目にある
      left: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      center: "title",
      right: "prev,next,today",
    },
    // 日付枠内の「日」を消す
    dayCellContent: function (e) {
      e.dayNumberText = e.dayNumberText.replace("日", "");
    },
    dayMaxEvents: true, // イベントの数が多くても枠の大きさを変更しないようにする
    events: [{ title: "test", start: "2022-10-06" }],
    eventClassNames: (arg) => {
      switch(arg.event.extendedProps.tag) {
        case "hoge1":
          return "red"
        case "hoge2":
          return "blue"
        case "hoge3":
          return "green"
        default:
          return "black"
      }
    },
    views: {
      listWeek: {
        eventContent: (arg) => {
          return arg.event
        }
      }
    }
  });
  calendar.render();
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

const tag_color = {
  "default": "#ff0000",
  "hoge1": "#00ff00"
}
const addTag = () => {
  const new_option = document.createElement("option")
  const tag_title = document.getElementById("tag_title").value
  new_option.innerText = tag_title
  tag_color[tag_title] = document.getElementById("tag_color").value
  document.getElementById("tag_input").appendChild(new_option)
}

const addEvent = () => {
  if (calendar === null) return;

  const new_event = {extendedProps: {}};
  new_event.title = document.getElementById("title_input").value;
  new_event.is_all_day = document.getElementById("is_all_day_input").checked;

  new_event.start = document.getElementById("start_input").value;
  new_event.start = new_event.start === "" ? null : new Date(new_event.start);
  if (!new_event.is_all_day) {
    new_event.end = document.getElementById("end_input").value;
    new_event.end = new_event.end === "" ? null : new Date(new_event.end);
  }

  if (!new_event.is_all_day && new_event.start === null) return;

  const background_color = tag_color[document.getElementById("tag_input").value]
  new_event.backgroundColor = background_color
  new_event.borderColor = background_color

  const rgb = hexToRgb(background_color)
  const lightness = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255
  new_event.textColor = lightness > 0.5 ? "#000000" : "#ffffff"

  calendar.addEvent(new_event); // https://fullcalendar.io/docs/event-model のcallbacksに一覧がある
};
