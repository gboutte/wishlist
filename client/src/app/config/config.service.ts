import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestWith, forkJoin, Observable, take } from 'rxjs';
import { AbstractService } from '../global/abstract.service';
import { ConfigStore } from './config.store';

@Injectable()
export class ConfigService extends AbstractService {
  private configStore: ConfigStore = inject(ConfigStore);

  getConfig(): Observable<{ isInstalled: boolean }> {
    return this.httpClient.get<{ isInstalled: boolean }>(
      this.getUrl() + '/status',
      this.httpOptions,
    );
  }
  refreshConfigStore() {
    const observableConfig = new BehaviorSubject(null);
    observableConfig.pipe(take(1));
    const observableProject = new BehaviorSubject(null);
    observableProject.pipe(take(1));

    this.getConfig().subscribe((config) => {
      this.configStore.isInstalled = config.isInstalled;
      observableConfig.next(null);
    });

    this.getConfigProject().subscribe((config) => {
      this.configStore.name = config.name;
      this.configStore.description = config.description;
      observableProject.next(null);
    })

    return forkJoin(observableConfig,observableProject);
  }


  getConfigProject():Observable<{
    name: string,
    description: string,
  }>{
    return this.httpClient.get<{
      name: string,
      description: string,
    }>(this.getUrl() + '/config/project', this.httpOptions);
  }

  saveConfigProject(name:string,description:string): Observable<void> {
    const body = {
      name: name,
      description: description
    };
    return this.httpClient.post<void>(this.getUrl() + '/config/project', body, this.httpOptions);

  }
}
