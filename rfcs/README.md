# Frost Test RFCs

Many changes, including bug fixes and documentation improvements can be
implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put
through a bit of a design process and produce a consensus among the Frost developers.

The "RFC" (request for comments) process is intended to provide a
consistent and controlled path for new features to enter the Frost test ecosystem.

[Active RFC List](https://github.com/ciena-frost/ember-frost-test/pulls)

## When you need to follow this process

You need to follow this process if you intend to make "substantial"
changes to Frost Test or its documentation. What constitutes a
"substantial" change is evolving based on community norms, but may
include the following.

   - Adding packages/tools we use for testing.
   - Modifying packages/tools we use for testing.
   - Removing packages/tools we use for testing.
   - Any new feature that creates new API surface area.
   - Removing features that already shipped.

Some changes do not require an RFC:

   - Rephrasing, reorganizing or refactoring
   - Addition or removal of warnings
   - Additions that strictly improve objective, numerical quality
criteria (speedup, better browser support)
   - Additions only likely to be _noticed by_ other implementors-of-ember-frost-test, invisible to users-of-ember-frost-test.

If you submit a pull request to implement a new feature without going
through the RFC process, it may be closed with a polite request to
submit an RFC first.

## Gathering feedback before submitting

It's often helpful to get feedback on your concept before diving into the
level of API design detail required for an RFC. **You may open an
issue on this repo to start a high-level discussion**, with the goal of
eventually formulating an RFC pull request with the specific implementation
design.

## What the process is

In short, to make "substantial" changes to ember-frost-test, one must first get the
RFC merged into the RFC repo as a markdown file. At that point the RFC
is 'active' and may be implemented with the goal of eventual inclusion
into Ember.

* Fork the RFC repo http://github.com/ciena-frost/ember-frost-test
* Copy `rfcs/0000-template.md` to `rfcs/text/0000-my-feature.md` (where
'my-feature' is descriptive. don't assign an RFC number yet).
* Fill in the RFC. Put care into the details: **RFCs that do not
present convincing motivation, demonstrate understanding of the
impact of the design, or are disingenuous about the drawbacks or
alternatives tend to be poorly-received**.
* Submit a pull request. As a pull request the RFC will receive design
feedback from the larger community, and the author should be prepared
to revise it in response.
* Build consensus and integrate feedback. RFCs that have broad support
are much more likely to make progress than those that don't receive any
comments.
* Eventually, the [reviewer team] will decide whether the RFC is a candidate
for inclusion in ember-frost-test.
* RFCs that are candidates for inclusion in ember-frost-test will enter a "final comment
period" lasting 7 days. The beginning of this period will be signaled with a
comment and tag on the RFC's pull request.
* An RFC can be modified based upon feedback from the [reviewer team] and community.
Significant modifications may trigger a new final comment period.
* An RFC may be rejected by the [reviewer team] after public discussion has settled
and comments have been made summarizing the rationale for rejection. A member of
the [reviewer team] should then close the RFC's associated pull request.
* An RFC may be accepted at the close of its final comment period. A [reviewer team]
member will merge the RFC's associated pull request, at which point the RFC will
become 'active'.

## The RFC life-cycle

Once an RFC becomes active then authors may implement it and submit the
feature as a pull request to the ember-frost-test repo. Becoming 'active' is not a rubber
stamp, and in particular still does not mean the feature will ultimately
be merged; it does mean that the [reviewer team] has agreed to it in principle
and are amenable to merging it.

Furthermore, the fact that a given RFC has been accepted and is
'active' implies nothing about what priority is assigned to its
implementation, nor whether anybody is currently working on it.

Modifications to active RFC's can be done in followup PR's. We strive
to write each RFC in a manner that it will reflect the final design of
the feature; but the nature of the process means that we cannot expect
every merged RFC to actually reflect what the end result will be at
the time of the next major release; therefore we try to keep each RFC
document somewhat in sync with the language feature as planned,
tracking such changes via followup pull requests to the document.

## Implementing an RFC

The author of an RFC is not obligated to implement it. Of course, the
RFC author (like any other developer) is welcome to post an
implementation for review after the RFC has been accepted.

If you are interested in working on the implementation for an 'active'
RFC, but cannot determine if someone else is already working on it,
feel free to ask (e.g. by leaving a comment on the associated issue).

When implementing a change, things that should be included in the PR are:
* Updates to documentation or creation of documentation showing how to use the new tool/feature
* Code changes

## Reviewing RFC's

Open RFC pull requests will be reviewed as they are submitted, time permitting.

[Based on Ember RFC process](https://github.com/emberjs/rfcs)
