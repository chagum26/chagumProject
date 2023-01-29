import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorService } from 'src/app/shared/services/color.service';
import { TypeApiData } from '../models/type/typeApiData';
import { TypePokemon } from 'src/app/pokemons/shared/models/types/typePokemon';


@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private http: HttpClient,
    private colorService: ColorService,
    ) { }

  getTypeDataByTypeId(url: string): Observable<TypeApiData> {
      return this.http.get<TypeApiData>(url);
  }

  convertColorForEachType(typesPokemon: TypePokemon[]): TypePokemon[] {
    let typesWithColor: TypePokemon[] = [];
    typesPokemon.map((typePokemon) => {
      typePokemon = this.colorService.setColorTypeFromApi(typePokemon);
      typesWithColor.push(typePokemon);
    });
    return typesWithColor;
  }
}
