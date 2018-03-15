import { Component, OnInit } from '@angular/core';
import { Profile, Country, State, City, ZipCode } from '../_models/index';
import { UserService, AuthenticationService, AlertService, CountryListService, StateListService, CityListService } from '../_services/index';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userProfileForm: FormGroup;
  private isLoading: boolean = false;
  private profile: Profile = new Profile();
  private selectedCountry: Country = new Country(231, 'USofA', 'USA', 1);
  private selectedState: State = new State(3923, 'Puerto Rico', 'PR');
  private selectedCity: City = new City(4, 'Aguada');
  private countries: Country[] = [];
  private states: State[] = [];
  private cities: City[] = [];

  constructor(private userService: UserService,
              private alertService: AlertService,
              private countryListService: CountryListService,
              private stateListService: StateListService,
              private cityListService: CityListService,
              private formBuilder: FormBuilder)  {

  }

  ngOnInit() {

    this.isLoading = true;

    this.userProfileForm = this.formBuilder.group({
        email : [{value: null, disabled: false}, []],
        company : [{value: null, disabled: false}, []],
        firstName : [{value: null, disabled: false}, []],
        lastName : [{value: null, disabled: false}, []],
        address1 : [{value: null, disabled: false}, []],
        address2 : [{value: null, disabled: false}, []],
        address3 : [{value: null, disabled: false}, []],
        phoneNumber : [{value: null, disabled: false}, []],
        avatar : [{value: null, disabled: false}, []],
        city : [{value: null, disabled: false}, []],
        state : [{value: null, disabled: false}, []],
        country : [{value: null, disabled: false}, []],
        zipcode : [{value: null, disabled: false}, []],
        about : ['', [
            Validators.minLength(0)
        ]],
    });

    this.countryListService.getAll()
    .subscribe(
       (data : Country[]) => {
          data.forEach( (country, index) => {
            this.countries[index] = new Country(country['id'], country['name'], country['sort_name'], country['phone_code']);
          });
        },
        errorResponse => {
          console.log(errorResponse);
    });


    this.userProfileForm.controls['country'].valueChanges.subscribe((value) => {
      //this.models = ... // here you add models to variable models based on selected make
    });

    this.userService.getUserProfile()
     .subscribe(
         (data : Profile[]) => {
            data.forEach( (element) => {
                this.userProfileForm.controls.email.setValue(element['customUser']['email'], {onlySelf: true, emitEvent: true});
                this.userProfileForm.controls.zipcode.setValue(element['addresses'][0]['zipcode']['zipcode'], {onlySelf: false, emitEvent: true});
                this.userProfileForm.controls.about.setValue(element['about'], {onlySelf: false, emitEvent: true});
                this.userProfileForm.controls.avatar.setValue(element['avatar'], {onlySelf: false, emitEvent: true});
                this.selectedCountry = element['addresses'][0]['country'];
                this.userProfileForm.controls.phoneNumber.setValue("+" + element['phoneNumbers'][0]['country']['phone_code'] + " " + element['phoneNumbers'][0]['phone_number']);
                this.getStates(this.selectedCountry.id);
                this.selectedState = element['addresses'][0]['state'];
                this.selectedCity = element['addresses'][0]['city'];
                this.userProfileForm.controls.address1.setValue(element['addresses'][0]['address1'], {onlySelf: true, emitEvent: false});
                 for (var i in element['names']) {
                    if (element['names'][i]['type']['type'] == 'First') {
                         this.userProfileForm.controls.firstName.setValue(element['names'][i]['name'] , {onlySelf: true, emitEvent: false});
                    }
                    if (element['names'][i]['type']['type'] == 'Last') {
                         this.userProfileForm.controls.lastName.setValue(element['names'][i]['name'] , {onlySelf: true, emitEvent: false});
                    }
                 }
            });
         },
         errorResponse => {
           console.log(errorResponse);
     });
  }

  getStates(countryId) {
        this.stateListService.getByCountry(countryId)
        .subscribe(
           (data : State[]) => {
              data.forEach( (state, index) => {
                this.states[index] = new State(state['id'], state['name'], state['code']);
                if (state['id'] == this.selectedState.id) {
                  this.userProfileForm.controls.state.patchValue(this.states.find(state => state['id'] == this.selectedState.id));
                  this.getCities(state['id']);
                }
              });
            },
            errorResponse => {
              console.log(errorResponse);
        });
  }
  getCities(stateId) {
      this.cityListService.getByState(stateId)
      .subscribe(
         (data : City[]) => {
            data.forEach( (city, index) => {
              this.cities[index] = new City(city['id'], city['name']);
              if (city['id'] == this.selectedCity.id) {
                this.userProfileForm.controls.city.patchValue(this.cities.find(city => city['id'] == this.selectedCity.id));
              }
            });
          },
          errorResponse => {
            console.log(errorResponse);
      });
  }

  getZipcodes(cityId) {
    //this.getZipcodes(cityId);
    console.log(cityId);
  }

  updateUserProfile(userProfileForm) {
        if (userProfileForm.controls.email.invalid) {
            this.alertService.error("");
            this.userProfileForm.reset();
            return;
        }
        this.isLoading = true;
  }

}
