import {createApp} from 'vue'
import App from './App.vue'
// import 'bootstrap/dist/css/bootstrap.min.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
//import 'primevue/resources/themes/aura-light-green/theme.css'

import router from './routers.js';
import './assets/tailwind.css';
import './assets/main.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {FilterMatchMode} from '@primevue/core/api';

library.add(faCoffee);

// PrimeVue Components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Password from 'primevue/password';
import Menu from 'primevue/menu';
import Skeleton from 'primevue/skeleton';
import Avatar from 'primevue/avatar';
import Checkbox from 'primevue/checkbox';
// import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
// import InputSwitch from 'primevue/inputswitch';
import Listbox from 'primevue/listbox';
import MultiSelect from 'primevue/multiselect';
// import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
// import Textarea from 'primevue/textarea';
import SplitButton from 'primevue/splitbutton';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import Card from 'primevue/card';
import Divider from 'primevue/divider';
import Fieldset from 'primevue/fieldset';
import Panel from 'primevue/panel';
// import ScrollPanel from 'primevue/scrollpanel';
// import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Toolbar from 'primevue/toolbar';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import DynamicDialog from 'primevue/dynamicdialog';
import OverlayPanel from 'primevue/overlaypanel';
import Tooltip from 'primevue/tooltip';
import Chip from 'primevue/chip';
import DialogService from 'primevue/dialogservice';
import AutoComplete from 'primevue/autocomplete';
import BadgeDirective from 'primevue/badgedirective';
// import Calendar from 'primevue/calendar';
import Chart from 'primevue/chart';
import Message from 'primevue/message';
import PanelMenu from 'primevue/panelmenu';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Image from 'primevue/image';
import Badge from 'primevue/badge';
import OverlayBadge from 'primevue/overlaybadge';
import ConfirmationService from 'primevue/confirmationservice';
import FileUpload from 'primevue/fileupload';
import Select from 'primevue/select';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Splitter from 'primevue/splitter';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Dropdown from 'primevue/dropdown';
import Tree from 'primevue/tree';


//Components
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
// import ComDialogContent from './components/form/ComDialogContent.vue'
import TimeAgo from '@/components/TimeAgo.vue'

const app = createApp(App);
app.use(router);
app.mount('#app');
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});
app.use(PrimeVue)
// app.provide("$moment", moment)
// window.moment = moment;
// app.component('Accordion', Accordion);
// app.component('AccordionTab', AccordionTab);
app.component('AutoComplete', AutoComplete);
app.component('Avatar', Avatar);
// app.component('AvatarGroup', AvatarGroup);
app.component('Badge', Badge);
// app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
// app.component('Calendar', Calendar);
app.component('Card', Card);
// app.component('Carousel', Carousel);
// app.component('CascadeSelect', CascadeSelect);
app.component('Chart', Chart);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
// app.component('Chips', Chips);
// app.component('ColorPicker', ColorPicker);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
// app.component('ContextMenu', ContextMenu);
app.component('DataTable', DataTable);
app.component('DataView', DataView);
// app.component('DataViewLayoutOptions', DataViewLayoutOptions);
// app.component('DeferredContent', DeferredContent);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
// app.component('Dock', Dock);
// app.component('Dropdown', Dropdown);
app.component('DynamicDialog', DynamicDialog);
app.component('Fieldset', Fieldset);
app.component('FileUpload', FileUpload);
// app.component('FullCalendar', FullCalendar);
// app.component('Galleria', Galleria);
app.component('Image', Image);
// app.component('InlineMessage', InlineMessage);
// app.component('Inplace', Inplace);
// app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
// app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
// app.component('Knob', Knob);
app.component('Listbox', Listbox);
// app.component('MegaMenu', MegaMenu);
app.component('Menu', Menu);
// app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
// app.component('OrderList', OrderList);
// app.component('OrganizationChart', OrganizationChart);
app.component('OverlayPanel', OverlayPanel);
// app.component('Paginator', Paginator);
app.component('Panel', Panel);
app.component('PanelMenu', PanelMenu);
app.component('Password', Password);
// app.component('PickList', PickList);
// app.component('ProgressBar', ProgressBar);
// app.component('ProgressSpinner', ProgressSpinner);
// app.component('Rating', Rating);
app.component('SelectButton', SelectButton);
// app.component('Sidebar', Sidebar);
app.component('Skeleton', Skeleton);
// app.component('Slider', Slider);
app.component('SplitButton', SplitButton);
app.component('Splitter', Splitter);
// app.component('SplitterPanel', SplitterPanel);
// app.component('Steps', Steps);
// app.component('TabMenu', TabMenu);
// app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
// app.component('Tag', Tag);
// app.component('Terminal', Terminal);
// app.component('TieredMenu', TieredMenu);
// app.component('Timeline', Timeline);
app.component('Toast', Toast);
app.component('Toolbar', Toolbar);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Dialog', Dialog);
app.component('DynamicDialog', DynamicDialog);
// app.component('OverlayPanel', OverlayPanel);
app.component('Chip', Chip);
app.component('Tooltip', Tooltip);
app.component('AutoComplete', AutoComplete)
// app.component('Calendar', Calendar)
app.component('Chart', Chart)
app.component('Skeleton', Skeleton)
app.component('Message', Message)
app.component('Password', Password)
app.component('PanelMenu', PanelMenu)
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('Avatar', Avatar);
app.component('Image', Image);
app.component('Badge', Badge);
app.directive('badge', BadgeDirective);
app.component('OverlayBadge', OverlayBadge);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);
app.component('Password', Password);
app.component('FileUpload', FileUpload);
app.component('Select', Select);
app.component('InputText', InputText);
app.component('AutoComplete', AutoComplete);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);   // optional
app.component('Row', Row);                   // optional
app.config.globalProperties.$filterMatchMode = FilterMatchMode;
app.component('Card', Card);
app.component('FileUpload', FileUpload);
app.component('InputGroup', InputGroup);
app.component('InputGroupAddon', InputGroupAddon);
app.component('Splitter', Splitter);
app.component('Listbox', Listbox);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);
app.component('Tree', Tree);

//Use Component
app.component('Header', Header);
app.component('Sidebar', Sidebar);
// app.component('ComDialogContent', ComDialogContent)

//Config
app.config.globalProperties.$filterMatchMode = FilterMatchMode;
app.component('TimeAgo', TimeAgo)


