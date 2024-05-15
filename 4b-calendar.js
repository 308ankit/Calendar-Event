var cal = {
    // (A) PROPERTIES
    mon : false, // monday first
    events : null, // events data for current month/year
    sMth : 0, sYear : 0, // selected month & year
    hMth : null, hYear : null, // html month & year
    hCD : null, hCB : null, // html calendar days & body
    // html form & fields
    hFormWrap : null, hForm : null, hfID : null, 
    hfStart : null, hfEnd : null, hfTxt : null,
    hfColor : null, hfBG : null, hfDel : null,
  
    // (B) SUPPORT FUNCTION - AJAX FETCH
    ajax : (data, onload) => {
      // (B1) FORM DATA
      let form = new FormData();
      for (let [k,v] of Object.entries(data)) { form.append(k,v); }
  
      // (B2) FETCH
      fetch("3-cal-ajax.php", { method:"POST", body:form })
      .then(res => res.text())
      .then(txt => onload(txt))
      .catch(err => console.error(err));
    },
   
    // (C) INIT CALENDAR
    init : () => {
      // (C1) GET HTML ELEMENTS
      cal.hMth = document.getElementById("calMonth");
      cal.hYear = document.getElementById("calYear");
      cal.hCD = document.getElementById("calDays");
      cal.hCB = document.getElementById("calBody");
      cal.hFormWrap = document.getElementById("calForm");
      cal.hForm = cal.hFormWrap.querySelector("form");
      cal.hfID = document.getElementById("evtID");
      cal.hfStart = document.getElementById("evtStart");
      cal.hfEnd = document.getElementById("evtEnd");
      cal.hfTxt = document.getElementById("evtTxt");
      cal.hfColor = document.getElementById("evtColor");
      cal.hfBG = document.getElementById("evtBG");
      cal.hfDel = document.getElementById("evtDel");
   
      // (C2) ATTACH CONTROLS
      cal.hMth.onchange = cal.load;
      cal.hYear.onchange = cal.load;
      document.getElementById("calToday").onclick = () => cal.today();
      document.getElementById("calBack").onclick = () => cal.pshift();
      document.getElementById("calNext").onclick = () => cal.pshift(1);
      document.getElementById("calAdd").onclick = () => cal.show();
      cal.hForm.onsubmit = () => cal.save();
      document.getElementById("evtCX").onclick = () => {
        if (document.startViewTransition) { document.startViewTransition(() => cal.hFormWrap.close()); }
        else { cal.hFormWrap.close(); }
      }
      cal.hfDel.onclick = cal.del;
   
      // (C3) DRAW DAY NAMES
      let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      if (cal.mon) { days.push("Sun"); } else { days.unshift("Sun"); }
      for (let d of days) {
        let cell = document.createElement("div");
        cell.className = "calCell";
        cell.innerHTML = d;
        cal.hCD.appendChild(cell);
      }
   
      // (C4) LOAD & DRAW CALENDAR
      cal.load();
    },
    // ...
  };
  window.onload = cal.init;