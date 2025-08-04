import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Member } from '../models/members.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private members$ = new BehaviorSubject<Member[]>([]);
  private dataUrl = 'http://localhost:8082/api/members';

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.http.get<Member[]>(this.dataUrl).subscribe((data) => {
      this.members$.next(data);
    });
  }

  getMembers(): Observable<Member[]> {
      return this.http.get<Member[]>(this.dataUrl);
  }

  getMemberByAdmissionId(admission_id: number): Member | undefined {
    return this.members$.value.find((m) => m.admission_id === admission_id);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.dataUrl, member);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${this.dataUrl}/admission_id/${id}`, data);
  }

  deleteMember(admission_id: number): Observable<any> {
    return this.http.delete(`${this.dataUrl}/admission_id/${admission_id}`);
  }

  filterMembersByBranch(branch: string): void {
    this.http.get<Member[]>(this.dataUrl)
      .pipe(
        map((members) =>
          branch === 'All Branches'
            ? members
            : members.filter((member) => member.branch === branch)
        )
      )
      .subscribe(filtered => this.members$.next(filtered));
  }

  private generateAdmissionId(): number {
    const current = this.members$.value;
    return current.length ? Math.max(...current.map(m => m.admission_id)) + 1 : 1;
  }
}
