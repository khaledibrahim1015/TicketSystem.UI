import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  getGovernorates(): Observable<string[]> {
    return of(['Select Governorate', 'Governorate1', 'Governorate2', 'Governorate3']);
  }

  getCities(): Observable<string[]> {
    return of(['Select City', 'City1', 'City2', 'City3']);
  }

  getDistricts(): Observable<string[]> {
    return of(['Select District', 'District1', 'District2', 'District3']);
  }
}
