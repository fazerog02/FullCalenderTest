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
  });
  calendar.render();
};

const addEvent = () => {
  if (calendar === null) return;

  const new_event = {};
  new_event.title = document.getElementById("title_input").value;
  new_event.is_all_day = document.getElementById("is_all_day_input").checked;

  new_event.start = document.getElementById("start_input").value;
  new_event.start = new_event.start === "" ? null : new Date(new_event.start);
  if (!new_event.is_all_day) {
    new_event.end = document.getElementById("end_input").value;
    new_event.end = new_event.end === "" ? null : new Date(new_event.end);
  }

  if (!new_event.is_all_day && new_event.start === null) return;

  calendar.addEvent(new_event); // https://fullcalendar.io/docs/event-model のcallbacksに一覧がある
};
