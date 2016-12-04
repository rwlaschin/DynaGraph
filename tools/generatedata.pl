#!/usr/bin/perl -w

use Time::HiRes qw(time);

@buffer=();
$i=0;
$now=int(time*1000);

sub rand1 {
  return $_[0] + int(rand($_[1] - $_[0]));
}

push @buffer, "timestamp,responsetime,bytes";

while( $i < 10000000 ) {
  push @buffer, "$now,".rand1(20,30000).",".rand1(1000000,5000000);
  if( ($i != 0) and ($i%8196 == 0) ) {
      print STDERR "\r$i";
      print join("\n",@buffer),"\n";
      @buffer=();
  }
  $i++;
  $now--;
}

print STDERR "\r$i\nDone\n";
print join("\n",@buffer),"\n";
