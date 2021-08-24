import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    currentUser: undefined,
    myClinics: [],
    myDoctors: [],
    myAdmininstrators: [],
    isLoader: false,
    isError: false,
    errorMessage: '',
    str: {
        Whychooseus: "Why choose us",
        Howitworks: "How it works",
        Pricing: "Pricing",
        Myaccount: "My account",
        Myclinincs: "My clinincs",
        Mydoctors: "My doctors",
        Mypayment: "My payment",
        Logout: "Logout",
        signup: "signup",
        login: "login",
        Registerinsecond: " Register in second",
        Fullname: "Full name",
        Enteremail: "Enter email",
        Enterphone: "Enter phone",
        Enterpassword: "Enter password",
        Confirmpassword: "Confirm password",
        Createyouraccount: "Create your account",
        or: "or",
        Bysigningupyouagreetothe: "By signing up you agree to the",
        Termsofservices: "Terms of services",
        Whychooseus: "Why choose us",
        Loremipsum: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
        Loremipsum1: " lorem ipsum  lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        ReadMore: "Read More",
        Howitworks: "How it works",
        twomonthsfree: "2 months free",
        ifyoupaidanually: "if you paid anually",
        freetrial: "free trial",
        fiftypercentdiscount: "50% discount",
        numberofdoctors: "number of doctors",
        SoloClinic: "Solo Clinic",
        seventydollermonth: "$ 75 / month",
        sixtydays: "60 days",
        one: "1",
        BuyNow: "Buy Now",
        SingleClinic: "Single Clinic",
        ninetyninedollermonth: "$ 99 / month",
        thertydays: "30 days",
        four: "4",
        MultiClinic: "Multi Clinic",
        zerodays: "0 days",
        twelve: "12",
        Monthly: "Monthly",
        Annually: "Annually",
        Saveseventeenpercent: "Save 17%",
        Startfreetrialnow: "Start free trial now!",
        Nocreditcardneeded: "Nocreditcardneeded",
        Aboutus: "  About us",
        SiteMap: " Site Map",
        Services: "Services",
        Testimonials: "Testimonials",
        Gallery: "Gallery",
        Blog: "Blog",
        ContactUs: " Contact Us",
        InternationalHousetwevelfConstanceStreetLondonE162DQ: "International House, 12 Constance Street, London E16 2DQ",
        numbers: "11072415",
        supportMail: "support@etat-life.com",
        FOLLOWUS: "FOLLOW US",
        new: "new",
    }

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ActionTypes.MYADMINISTRATORS:
            return ({
                ...state,
                myAdmininstrators: action.payload
            })
        case ActionTypes.MYCLINICS:
            return ({
                ...state,
                myClinics: action.payload
            })
        case ActionTypes.MYDOCTORS:
            return ({
                ...state,
                myDoctors: action.payload
            })
        case ActionTypes.FOLDERNAME:
            return ({
                ...state,
                folderName: action.payload
            })
        case ActionTypes.CURRENTUSER:
            return ({
                ...state,
                currentUser: action.payload
            })

        case ActionTypes.LOADER:
            return ({
                ...state,
                isLoader: !state.isLoader
            })
        case ActionTypes.SHOWERROR:
            return ({
                ...state,
                isLoader: !state.isLoader,
                isError: !state.isError,
                errorMessage: action.payload
            })

        case ActionTypes.HIDEERROR:
            return ({
                ...state,
                isError: false,
                errorMessage: ''
            })

        case ActionTypes.LANGUAGESET:
            return ({
                ...state,
                str: action.payload
            })
        default:
            return state;
    }

}