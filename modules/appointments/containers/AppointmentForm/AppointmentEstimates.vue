<template>
  <div class="appointment-info">
    <div class="appointment-address">
      <div class="appointment-address__location">
        <p class="appointment-address__location-label">Office postcode</p>
        <p class="appointment-address__location-postcode">
          <AppIcon name="circle-dot" width="14px" style="color: #2196f3" />
          <span> CM27PJ</span>
        </p>
      </div>
      <div class="appointment-address__location">
        <p class="appointment-address__location-label">Destination postcode</p>
        <p class="appointment-address__location-postcode">
          <AppIcon name="location-dot" width="12px" style="color: red" />
          <span> {{ postcode || '-' }}</span>
        </p>
      </div>
    </div>
    <div class="appointment-estimates">
      <div class="appointment-estimates__box">
        <p class="appointment-estimates__box-title">Mesafe</p>
        <p class="appointment-estimates__box-estimate">
          {{ estimates.distance || '-' }}
        </p>
      </div>
      <div class="appointment-estimates__box">
        <p class="appointment-estimates__box-title">Süre</p>
        <p class="appointment-estimates__box-estimate">
          {{ estimates.duration || '-' }}
        </p>
      </div>
      <div class="appointment-estimates__box">
        <p class="appointment-estimates__box-title">Ofisten çıkış zamanı</p>
        <p class="appointment-estimates__box-estimate">
          {{ estimates.outOfficeDate || '-' }}
        </p>
      </div>
      <div class="appointment-estimates__box">
        <p class="appointment-estimates__box-title">Ofise dönüş zamanı</p>
        <p class="appointment-estimates__box-estimate">
          {{ estimates.backOfficeDate || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postcode: {
      type: String,
      default: null,
    },
    estimates: {
      type: Object, // distance, duration,outOfficeDate,backOfficeDate
      default: null,
    },
  },
}
</script>

<style lang="scss">
.appointment-info {
  height: 100%;
  padding: 2rem 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-flow: column wrap;
}
.appointment-address {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
  &__location {
    &-label {
      font-size: 0.9rem;
      margin: 0 0 0.7rem 0;
      color: #555;
    }
    &-postcode {
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
    }
  }
}
.appointment-estimates {
  display: grid;
  gap: 1.5rem;
  &__box {
    display: flex;
    flex-flow: column wrap;
    &-title {
      font-size: 0.9rem;
      margin: 0 0 0.7rem 0;
      color: #555;
    }
    &-estimate {
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>
