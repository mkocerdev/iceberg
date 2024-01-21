import Vue from 'vue'
import dayjs from 'dayjs'

export default function () {
  /**
   * @param {String} date Date ISO string
   * @returns {String} Formatted date
   */
  Vue.filter('formatDate', (date) => {
    if (!date) {
      throw new Error('Must provide date parameter.')
    }
    return dayjs(date).format('D MMMM YYYY, HH:mm:ss')
  })
}
