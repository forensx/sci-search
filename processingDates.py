import datetime


date_sample = [{'year': '2017', 'month': 'Jan', 'day': '25'},
               {'year': '2017', 'month': None, 'day': None}]

date_time_str = 'Jun 28 2018'

date_times = []

for date in date_sample:
    print(date)
    date_str = "{} {} {}".format(date['month'], date['day'], date['year'])
    try:
        print(datetime.datetime.strptime(date_str, '%b %d %Y').date())
    except:
        print(None)
