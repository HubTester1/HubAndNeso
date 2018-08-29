			var patternDates;

			switch ($('select#Pattern-Basis').val()) {

				case "xDays":
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXDaysEndNever($('input#X-Days').val(), $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXDaysEndAfterYOccurrences($('input#X-Days').val(), $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXDaysEndByDateY($('input#X-Days').val(), $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "weekdays":
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryWeekdayEndNever($('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryWeekdayEndAfterXOccurrences($('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryWeekdayEndByDateX($('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "xWeeks":
					var daysOfWeek = [];
					if (typeof (eventItem["days-of-week-for-x-weeks_1"]) != "undefined") {
						daysOfWeek.push("Sunday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_2"]) != "undefined") {
						daysOfWeek.push("Monday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_3"]) != "undefined") {
						daysOfWeek.push("Tuesday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_4"]) != "undefined") {
						daysOfWeek.push("Wednesday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_5"]) != "undefined") {
						daysOfWeek.push("Thursday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_6"]) != "undefined") {
						daysOfWeek.push("Friday");
					}
					if (typeof (eventItem["days-of-week-for-x-weeks_7"]) != "undefined") {
						daysOfWeek.push("Saturday");
					}

					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXWeeksOnYDaysEndNever($('input#X-Weeks').val(), daysOfWeek, $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXWeeksOnYDaysEndAfterZOccurrences($('input#X-Weeks').val(), daysOfWeek, $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXWeeksOnYDaysEndByDateZ($('input#X-Weeks').val(), daysOfWeek, $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "monthlySameDay":
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXDaysOfEveryYMonthsEndNever($('input#Day-of-Month-for-X-Months').val(), $('input#X-Months-For-Same-Day').val(), $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXDaysOfEveryYMonthsEndAfterYOccurrences($('input#Day-of-Month-for-X-Months').val(), $('input#X-Months-For-Same-Day').val(), $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXDaysOfEveryYMonthsEndByDateY($('input#Day-of-Month-for-X-Months').val(), $('input#X-Months-For-Same-Day').val(), $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "monthlySameWeek":
					switch ($('input#Ordinal-For-Day-of-Week-For-X-Months-For-Same-Week').val()) {
						case "First":
							var xVar = 1;
							break;
						case "Second":
							var xVar = 2;
							break;
						case "Third":
							var xVar = 3;
							break;
						case "Fourth":
							var xVar = 4;
							break;
					}
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXYDayOfEveryZMonthsEndNever(xVar, $('input#Days-of-Week-For-X-Months-For-Same-Week').val(), $('input#X-Months-For-Same-Week').val(), $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXYDayOfEveryZMonthsEndAfterYOccurrences(xVar, $('input#Days-of-Week-For-X-Months-For-Same-Week').val(), $('input#X-Months-For-Same-Week').val(), $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXYDayOfEveryZMonthsEndByDateY(xVar, $('input#Days-of-Week-For-X-Months-For-Same-Week').val(), $('input#X-Months-For-Same-Week').val(), $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "yearlySameDay":
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXDayYMonthEveryYearEndNever($('input#Months-for-Same-Date-Each-Year').val(), $('input#Date-for-Same-Date-Each-Year').val(), $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXDayYMonthEveryYearEndAfterYOccurrences($('input#Months-for-Same-Date-Each-Year').val(), $('input#Date-for-Same-Date-Each-Year').val(), $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXDayYMonthEveryYearEndByDateY($('input#Months-for-Same-Date-Each-Year').val(), $('input#Date-for-Same-Date-Each-Year').val(), $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

				case "yearlySameWeek":
					var xVar = $('select#Ordinal-For-Same-Week-Each-Year').val();
					var zVar = $('input#Months-for-Same-Week-Each-Year').val();
					/* switch ($('select#Ordinal-For-Same-Week-Each-Year').val()) {
						case "First":
							var xVar = 1;
							break;
						case "Second":
							var xVar = 2;
							break;
						case "Third":
							var xVar = 3;
							break;
						case "Fourth":
							var xVar = 4;
							break;
					}
					switch ($('input#Months-for-Same-Week-Each-Year').val()) {
						case "January":
							var zVar = 1;
							break;
						case "February":
							var zVar = 2;
							break;
						case "March":
							var zVar = 3;
							break;
						case "April":
							var zVar = 4;
							break;
						case "May":
							var zVar = 5;
							break;
						case "June":
							var zVar = 6;
							break;
						case "July":
							var zVar = 7;
							break;
						case "August":
							var zVar = 8;
							break;
						case "September":
							var zVar = 9;
							break;
						case "October":
							var zVar = 10;
							break;
						case "November":
							var zVar = 11;
							break;
						case "December":
							var zVar = 12;
							break;
					} */
					switch ($('select#Ending-Basis').val()) {
						case "Never":
							patternDates = $().GenerateDatesForEveryXYDayZMonthEveryYearEndNever(xVar, $('select#Days-of-Week-For-Same-Week-Each-Year').val(), zVar, $('input#Start-Date').val());
							break;
						case "After a given number of occurrences":
							patternDates = $().GenerateDatesForEveryXYDayZMonthEveryYearEndAfterYOccurrences(xVar, $('select#Days-of-Week-For-Same-Week-Each-Year').val(), zVar, $('input#Start-Date').val(), $('input#Qty-Occurrences').val());
							break;
						case "By a date":
							patternDates = $().GenerateDatesForEveryXYDayZMonthEveryYearEndByDateY(xVar, $('select#Days-of-Week-For-Same-Week-Each-Year').val(), zVar, $('input#Start-Date').val(), $('input#Ending-Date').val());
							break;
					}
					break;

			} // end generation of patternDates
