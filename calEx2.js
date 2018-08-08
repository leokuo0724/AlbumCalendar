var Cal = function(divId) {

  //Store div id
  this.divId = divId;

  // Days of week, starting on Sunday
  this.DaysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Months, stating on January
  this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

  // Set the current month, year
  var d = new Date();

  this.currMonth = d.getMonth();
  this.currYear = d.getFullYear();
  this.currDay = d.getDate();
};

// Goes to next month 進行NEXT鍵時
Cal.prototype.nextMonth = function() {
  if ( this.currMonth == 11 ) {
    this.currMonth = 0;
    this.currYear = this.currYear + 1;
  }
  else {
    this.currMonth = this.currMonth + 1;
  }
  this.showcurr();

	selectDate();
};

// Goes to previous month 進行PREV
Cal.prototype.previousMonth = function() {
  if ( this.currMonth == 0 ) {
    this.currMonth = 11;
    this.currYear = this.currYear - 1;
  }
  else {
    this.currMonth = this.currMonth - 1;
  }
  this.showcurr();

	selectDate();
};

// Show current month
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth);
};

// Show month (year, month)
Cal.prototype.showMonth = function(y, m) {

  var d = new Date()
  // First day of the week in the selected month
  , firstDayOfMonth = new Date(y, m, 1).getDay()
  // Last day of the selected month
  , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
  // Last day of the previous month
  , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();


  var html = '<table>';

  // Write selected month and year
  html += '<thead><tr>';
  html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  html += '</tr></thead>';


  // Write the header of the days of the week
  html += '<tr class="days">';
  for(var i=0; i < this.DaysOfWeek.length;i++) {
    html += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  html += '</tr>';

  // Write the days
  var i=1;
  do {

    var dow = new Date(y, m, i).getDay();

    // If Sunday, start new row
    if ( dow == 0 ) {
      html += '<tr>';
    }
    // If not Sunday but first day of the month
    // it will write the last days from the previous month
    else if ( i == 1 ) {
      html += '<tr>';
      var k = lastDayOfLastMonth - firstDayOfMonth+1;
      for(var j=0; j < firstDayOfMonth; j++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    // Write the current day in the loop
    var chk = new Date();
    var chkY = chk.getFullYear();
    var chkM = chk.getMonth();
    if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
      html += '<td class="today">' + i + '</td>';
    } else {
      html += '<td class="normal">' + i + '</td>';
    }
    // If Saturday, closes the row
    if ( dow == 6 ) {
      html += '</tr>';
    }
    // If not Saturday, but last day of the selected month
    // it will write the next few days from the next month
    else if ( i == lastDateOfMonth ) {
      var k=1;
      for(dow; dow < 6; dow++) {
        html += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    i++;
  }while(i <= lastDateOfMonth);

  // Closes table
  html += '</table>';

  // Write HTML to the div
  document.getElementById(this.divId).innerHTML = html;
};

// On Load of the window
window.onload = function() {

  // Start calendar
  var c = new Cal("divCal");
  c.showcurr();

  // Bind next and previous button clicks
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };

	// 保存原本標題

	selectDate();
}

// 點擊日期 td normal today
function selectDate(){
	var currentTd = null;
	var aTd = document.getElementsByTagName('td');
	var aTdNormal = document.getElementsByClassName('normal');
	var oTdToday = document.getElementsByClassName('today')[0];
	var oTitle = document.getElementsByTagName('h3')[0];

	// 點擊今日以外的其他日期
	for(var i=0; i<aTdNormal.length; i++){
		aTdNormal[i].index = i;
		aTdNormal[i].onclick = function(){
			currentTd = this.index;
			tdNormal();
			changeTitle();
		}
		// 點擊今日，將其他都消除
		oTdToday.onclick = function(){
			for(var i=0; i<aTdNormal.length; i++){
				aTdNormal[i].className = 'normal';
			}

		}
	}

	// 點擊改變td顯色
	function tdNormal(){
		for(var i=0; i<aTdNormal.length; i++){
			aTdNormal[i].className = 'normal';
		}
		aTdNormal[currentTd].className = 'normal active';
	}
	// 點擊日期改變 title
	function changeTitle(){
		var aMonthYear = aTd[0].innerHTML.split(" ");
		var day;
		var allDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var aNotCurrTd = document.getElementsByClassName('not-current');
		var Num = currentTd + aNotCurrTd.length;

		for(var i=0; i<8; i++){
			if(Num % 7 == i){
				if(i == 0){
					day = allDay[6];
				} else{
					day = allDay[i-1];
				}
			}
		}
		// 決定是st nd rd 還是th
		var numStr;
		if((currentTd+1) % 10 ==1){
			numStr = 'ST';
		} else if((currentTd+1) % 10 ==2){
			numStr = 'ND';
		} else if((currentTd+1) % 10 ==3){
			numStr = 'RD';
		} else {
			numStr = 'TH';
		}

		oTitle.innerHTML = day +'<br>'+ aMonthYear[0]+' '+(currentTd+1)+numStr;
	}
	// 今日日期
	function getTodayTitle(){
		var d = new Date();
		var dDay = d.getDay();
		var allDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var dMonth = d.getMonth();
		var allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
		var dDate = d.getDate();

	}
}


// Get element by id
function getId(id) {
  return document.getElementById(id);
}
