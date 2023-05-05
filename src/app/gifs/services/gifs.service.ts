import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifsSearch } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = '9WttZdLpT33GpTGt19hyNUOoYDsNmEPD';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  constructor(private httpClient: HttpClient) {
    this.getLocalStorage();
  }

  get tagHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  getLocalStorage(): void {
    const temp: string | null = localStorage.getItem('history');
    if (!temp) return;
    else {
      this._tagsHistory = JSON.parse(temp);
      this.searchTag(this._tagsHistory[0]);
    }
  }
  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.httpClient
      .get<GifsSearch>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      });
  }
}
