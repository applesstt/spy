import moment from 'moment';

export default function fromNow(data) {
  moment.locale('zh-cn');
  console.log(moment(data).fromNow());
  return moment(data).fromNow();
}
