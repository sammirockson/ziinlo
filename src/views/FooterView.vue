<template>
  <footer>
    <div class="content-view">
        <div class="content-cell" v-for="list in lists" :key="list">
          <label class="list-title-label">{{ list.title }}</label>
          <div class="spacer"></div>
          <div class="list-view" v-for="item in list.content" :key="item">
            <label for="" >{{ item }}</label>
          </div>
        </div>
    </div>
    <div class="copyright">
       <label for="">All Rights Reserved © {{ currentYear }} Ziinlo.com</label>
    </div>
  </footer>
</template>

<script>
import dayjs, { Dayjs } from 'dayjs';
export default {
  data() {
    return {
      lists: [
        {
          'title': 'Services', 
          'content': [
             'Features', 
             'Templates', 
             'Pricing', 
             'About', 
             'Contact US'
          ]
        },
        {
          'title': 'Use Cases', 
          'content': [
             'Project Management', 
             'Team Managment', 
             'HR & Sales', 
             'Software Development', 
             'Operations'
          ]
        }, 
        {
          'title': 'Company', 
          'content': [
             'Employement', 
             'Press', 
             'Partnership', 
             'Investment', 
             'Customer Stories'
          ]
        }, 
        {
          'title': 'Resources', 
          'content': [
             'Help Center', 
             'Community', 
             'Blog', 
             'Whats New', 
             'Hire an Expert'
          ]
        }
      ], 
      currentYear: 2024
    }
  }, 
  mounted() {
    this.currentYear = dayjs().year()
  }
}
</script>

<style lang="scss" scoped>
.copyright {
  margin-top: 190px;
}
.list-view {
  height: 38px;
}

.content-cell {
  width: 100%;
  label {
    color: var(--color-light-variant);
    cursor: pointer;
    font-weight: 400;
  }
  .list-title-label {
    font-size: 20px;
    font-weight: 600;
    height: 50px;
    cursor: none;
  }
}
.content-view {
  display: flex;
  width: 800px;
  height: 50%;
  margin: 0 auto 0 auto;
  padding-top: 60px;
}
.spacer {
  height: 15px;
  width: 100%;
}
footer {
    height: 500px;
    background-color: #111111;
}
</style>