<template>
  <div class="about-us">
    <NavBar :selectedIndex="3" @didSelectNavItem="didSelectNavItem" :isContactVisible="false"/>
    <div class="desktop">
        <div class="contentView">
        <div class="top-content-view">
        <img src="../assets/right-shape.png" class="right-shape">
        <div class="center-info-container">
            <h2><span class="charge">Ziinlo</span> - Team & project<br>management solution for you.</h2>
           <div class="rightContent">
             <img src="../assets/mockshot.svg" class="rightMockup">
           </div>
        </div>
        <img src="../assets/left-shape.png" class="right-shape">
   </div>

                <div class="contactUs">
                    <div class="contactContainer">
                        <div class="contactLeft">
                            <h2 class="contactTitle">Contact Information</h2>
                            <h3 class="contactSubTitle">We are excited to hear from you. Please note that it might take
                                up to 24 to 48 hours to get back to you. We appreciate your patience.</h3>
                            <div class="contactDetails">
                                <div class="phoneContent">
                                    <span class="material-symbols-outlined" id="iconSpan">call</span>
                                    <h2 class="contactHTitle">13066099943</h2>
                                </div>
                                <div class="emailContent">
                                    <span class="material-symbols-outlined" id="iconSpan">mail</span>
                                    <h2 class="contactHTitle">support@ziinlo.com</h2>
                                </div>
                                <div class="locationContent">
                                    <span class="material-symbols-outlined" id="iconSpan">location_on</span>
                                    <h2 class="contactHTitle">Shanghai, China</h2>
                                </div>

                            </div>
                        </div>
                        <form ref="form" class="contactRight">
                            <h3 class="error" v-if="errorMessage != null">{{errorMessage}}</h3>
                            <div class="nameEmailContainer">
                                <div class="nameContent">
                                    <h2 class="nameEmailTitle">Your Name</h2>
                                    <input v-model="fullName" class="nameField" type="text" placeholder="Full Name" name="to_name">
                                    <div class="line"></div>
                                </div>
                                <div class="emailInputContent">
                                    <h2 class="nameEmailTitle">Your Email</h2>
                                    <input v-model="email" class="nameField" type="email" placeholder="example@mail.com"
                                        name="from_name">
                                    <div class="line"></div>
                                </div>
                            </div>
                            <div class="emailSubjectInput">
                                <h2 class="nameEmailTitle">Email Subject</h2>
                                <input v-model="emailSubject" class="emailSubjectField" type="text"
                                    placeholder="Brief subject of the email" name="subject">
                                <div class="line"></div>
                            </div>
                            <div class="messageContent">
                                <h2 class="nameEmailTitle">Email Message</h2>
                                <textarea v-model="message" class="messageField" name="Write your message here"
                                    id="messageField" cols="30" rows="10" placeholder="Write your message here"></textarea>
                                <div class="line"></div>
                            </div>

                            <input v-if="!isSending" @click="handleSubmit" class="submitBtn" type="button"
                                value="Send Mail">
                            <button v-if="isSending" class="loaderAnim buttonload submitBtn">
                                <i class="fa fa-circle-o-notch fa-spin"></i> Sending...
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <FooterView />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import FooterView from '@/views/FooterView.vue';

export default {
    components: {
        NavBar, FooterView
    }, 
    methods: {
        didSelectNavItem(navItem) {
            if (navItem.id === 'templates') { // Template
                this.$router.push({path: '/templates'})
            } else if (navItem.id === 'pricing') { // Pricing
                this.$router.push({path: '/pricing'})
            } else if (navItem.id === 'features') { // About Page
                this.$router.push({path: '/'})
            }
        }, 
        handleContact() {
           console.log("contact us tapped")
           var element = document.getElementById("app");
           element.scrollTop = element.scrollHeight;
        }
    }
}
</script>

<style lang="scss" scoped>
.top-content-view {
    display: flex;
    justify-content: space-between;
    height: 400px;
    width: 100vw;
    margin-bottom: 30px;
    padding-top: 50px;
    background-color: var(--color-light-yellow);
}
.logoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    gap: 0px;
    margin-left: auto;
    margin-right: auto;
    margin-top: -10px;
}

.banner {
    width: 15rem;
    height: 8rem;
    object-fit: contain;
}

.availableOn {
    font-weight: 600;
    font-size: 15px;
    margin-top: -28px;
}

.appstoreContainer {
    display: flex;
    width: 300px;
    height: 4rem;
    margin-left: auto;
    margin-right: auto;
    gap: 4%;
    margin-top: 10px;
}

.appstore {
    width: 48%;
    height: 80%;
    object-fit: contain;
    margin-top: 50px;
}

.playstore {
    width: 48%;
    height: 80%;
    object-fit: contain;
    margin-top: 50px;
}

.mockContainer {
    width: 84%;
    margin-left: auto;
    margin-right: auto;
}

.mockup {
    width: 100%;
    height: 100%;
    margin-top: 100px;
}

.desktop {
    width: 100vw;
    overflow-y: scroll;
    padding-top: 60px;
}

.mobile {
    display: none;
}

.navBar {
    width: 100vw;
    height: 34px;
    background: white;
    box-shadow: var(--box-shadow);
    position: fixed;
}

.navContent {
    width: 84%;
    height: 100%;
    background: white;
    margin-left: auto;
    margin-right: auto;
}

.logoBanner {
    width: 200px;
    height: 40px;
    object-fit: contain;
    margin-left: -40px;
}

.logo {
    display: block;
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-top: 5px;
}

.logoContentView {
    display: flex;
    flex-direction: row;
    width: 20%;
    height: 80%;
    gap: 8px;
    float: left;
    margin-left: 0px;
}

.topRightContainer {
    display: flex;
    width: 100px;
    height: 32px;
    float: right;
    margin-top: 0px;
    gap: 3px;
    background: var(--color-dark-primary);
    padding-top: 8px;
    padding-right: 12px;
    padding-left: 12px;
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    cursor: pointer;
}

#phoneIcon {
    margin: 0;
    padding: 0;
    margin-top: 3px;
    font-size: 16px;
    font-weight: 600;
    color: white;
}

.topRightContainer h2 {
    font-weight: 400;
    font-size: 15px;
    width: 100%;
    margin: 0;
    padding: 0;
    color: white;
    text-align: center;
}

.center-info-container {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
}

.contentView {
    width: 100vw;
    height: 70%;
    background: rgba(255, 255, 255, 1.0);
}


.leftContent {
    width: 100%;
    height: 100%;
}

.rightContent {
    background: transparent;
    width: 50%;
    height: 100%;
}


.rightMockup {
    width: 90%;
    height: 90%;
    object-fit: contain;
    margin-left: auto;
    margin-right: auto;
    margin-top: 110px;
}

.leftContent, .charge {
    color: var(--color-dark-primary);
    font-weight: 900;
    font-size: 80px;
}

.charge {
  margin-left: 0px;
}

.center-info-container h2 {
    font-weight: 600;
    font-size: 40px;
    margin-top: 40px;
}


.appstoresContainer {
    display: flex;
    gap: 15px;
    height: 120px;
    width: 500px;
}

.contactUs {
    display: block;
    height: 100vh;
    width: 100%;
}

.contactContainer {
    display: flex;
    width: 1000px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--card-border-radius-one);
    margin-top: 400px;
}

.contactLeft {
    width: 39%;
    height: 97%;
    background-color: var(--color-light-yellow);
    margin-top: auto;
    margin-bottom: auto;
    border-radius: var(--card-border-radius-one);
    margin-left: 0.8%;
}

.contactRight {
    width: 60%;
    height: 96%;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 10px;
}

.contactLeft .contactTitle {
    width: 90%;
    margin: 0;
    padding: 0;
    margin-left: 30px;
    margin-right: auto;
    margin-top: 30px;
}

.contactLeft .contactSubTitle {
    margin-left: 30px;
    font-weight: 300;
    font-size: 12px;
    margin-right: 20px;
}

.contactDetails {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 50%;
    align-items: center;
    align-content: center;
    gap: 8px;
    margin-top: 20px;
}

.phoneContent {
    display: flex;
    width: 90%;
    height: 60px;
    align-items: center;
    align-content: center;
    gap: 8px;
}

.emailContent {
    display: flex;
    width: 90%;
    height: 60px;
    align-items: center;
    align-content: center;
    gap: 8px;
}

.locationContent {
    display: flex;
    width: 90%;
    height: 60px;
    align-items: center;
    align-content: center;
    gap: 5px;
}

#iconSpan {
    font-weight: 900;
}

.contactHTitle {
    font-size: 15px;
}

nav {
  padding: 30px;
}

.nameEmailContainer {
    display: flex;
    width: 94%;
    height: 90px;
    margin-top: 5%;
    gap: 14px;
}


.nameContent {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100px;
    margin-left: 30px;
}

.emailInputContent {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100px;
}

.nameEmailTitle {
    font-weight: 300;
    color: white;
    font-size: 12px;
    text-align: left;
}


.nameField {
    height: 30px;
    padding-right: 8px;
    color: black;
    border: 0 transparent;
}

.nameField:focus {
    border: none;
}

.line {
    height: 1px;
    width: 100%;
    background-color: var(--color-info-light);
}

.emailSubjectInput {
    margin-left: 30px;
    margin-right: 40px;
}

.messageContent {
    margin-left: 30px;
    height: 120px;
    width: 90%;
    margin-top: 30px;
}

.messageField {
    height: 100px;
    width: 100%;
    padding-right: 8px;
    color: white;
    border: 0 transparent;
    font-family: "Poppins", sans-serif;
}

.emailSubjectField {
    height: 30px;
    width: 100%;
    padding-right: 8px;
    color: black;
    border: 0 transparent;
}

.submitBtn {
    width: 120px;
    height: 50px;
    background-color: var(--color-dark-primary);
    color: white;
    font-weight: 600;
    border: 0 transparent;
    border-radius: 8px;
    margin-top: 50px;
    margin-left: 50px;
}


.error {
    margin: 0;
    padding: 0;
    height: 20px;
    color: red;
    font-weight: 300;
    margin-left: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

@media screen and (max-width: 768px) {
    .mobile {
        display: block;
    }

    .desktop {
        display: none;
    }

    nav a.router-link-exact-active {
     color: #42b983;
    }
}
</style>