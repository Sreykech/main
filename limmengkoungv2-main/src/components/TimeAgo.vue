<!-- <template >
 
  <Timeago :datetime="date" long >
      <template #default="{ secondsElapsed, timeago }">
          {{ secondsElapsed <= 2700000 ? timeago : date_string }}
      </template>
  </Timeago>
</template>
<script setup>

import moment from "@/utils/moment";
import { Timeago } from 'vue2-timeago'
import { ref,defineProps } from 'vue'

const props = defineProps(
  {
      date: Date
  }
)
let date_string = ref("")

if (props?.date?.toString().length<=10){
  date_string = moment(props.date).format('DD-MM-YYYY')
}else {
  date_string = moment(props.date).format("DD-MM-yy h:mm:ss A")
}


</script> -->

<template>
  <span>{{ formattedDate }}</span>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const formattedDate = ref('');

// Watch for changes in props.date and update formattedDate accordingly
watchEffect(() => {
  if (props.date) {
    formattedDate.value = formatDistanceToNow(new Date(props.date), { addSuffix: true });
  }
});
</script>