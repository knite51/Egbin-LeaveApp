module.exports =  function workingDaysBetweenDates(startDate, endDate) {
    let newStartDate = new Date(startDate);
    let newEndDate = new Date(endDate)
  
    // Validate input
    if (newEndDate < newStartDate)
        return 0;
    
    // Calculate days between dates
    var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    newStartDate.setHours(0,0,0,1);  // Start just after midnight
    newEndDate.setHours(23,59,59,999);  // End just before midnight
    var diff = newEndDate - newStartDate;  // Milliseconds between datetime objects    
    var days = Math.ceil(diff / millisecondsPerDay);
    
    // Subtract two weekend days for every week in between
    var weeks = Math.floor(days / 7);
    days = days - (weeks * 2);

    // Handle special cases
    var startDay = newStartDate.getDay();
    var endDay = newEndDate.getDay();
    
    // Remove weekend not previously removed.   
    if (startDay - endDay > 1)         
        days = days - 2;      
    
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay === 0 && endDay !== 6)
        days = days - 1  
            
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay === 6 && startDay !== 0)
        days = days - 1  
    
    return days;
}
