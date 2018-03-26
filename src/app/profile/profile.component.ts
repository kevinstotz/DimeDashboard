import { Component, OnInit } from '@angular/core';
import { Profile, Country, State, City, ZipCode } from '../_models/index';
import { UserService, AuthenticationService, AlertService, CountryListService, StateListService, CityListService } from '../_services/index';
import { FormsModule, FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private userProfileForm: FormGroup;
  private isLoading: boolean = false;
  private profile: Profile = new Profile();
  private selectedCountry: Country = new Country(232, 'USofA', 'USA', 1);
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
        email : [{value: null, disabled: true}, []],
        company : [{value: null, disabled: true}, []],
        firstName : [{value: null, disabled: true}, []],
        lastName : [{value: null, disabled: true}, []],
        address1 : [{value: null, disabled: true}, []],
        address2 : [{value: null, disabled: true}, []],
        address3 : [{value: null, disabled: true}, []],
        phoneNumber : [{value: null, disabled: true}, []],
        avatar : [{value: null, disabled: true}, []],
        city : [{value: null, disabled: true}, []],
        state : [{value: null, disabled: true}, []],
        country : [{value: null, disabled: true}, []],
        zipcode : [{value: null, disabled: true}, []],
        birth_date : [{value: null, disabled: true}, []],
        about : ['', [
            Validators.minLength(0)
        ]],
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
                this.getCountries();
                this.userProfileForm.controls.phoneNumber.setValue("+" + element['phoneNumbers'][0]['country']['phone_code'] + " " + element['phoneNumbers'][0]['phone_number']);
                this.getStates(this.selectedCountry.id);
                this.selectedState = element['addresses'][0]['state'];
                this.selectedCity = element['addresses'][0]['city'];
                this.userProfileForm.controls.birth_date.setValue(element['birth_date'], {onlySelf: false, emitEvent: true});
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

  getCountries() {
      this.countryListService.getAll()
      .subscribe(
         (data : Country[]) => {
            data.forEach( (country, index) => {
              this.countries[index] = new Country(country['id'], country['name'], country['sort_name'], country['phone_code']);
              if (country['id'] == this.selectedCountry.id) {
                this.userProfileForm.controls.country.patchValue(this.countries.find(country => country['id'] == this.selectedCountry.id));
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
